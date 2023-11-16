import { Injectable } from '@nestjs/common';
import { CreateAudioDto } from './dto/create-audio.dto';
import { UpdateAudioDto } from './dto/update-audio.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AudiosService {
  constructor(private prisma: PrismaService) {}
  async createAudio(
    createAudioDto: CreateAudioDto & { file: Express.Multer.File },
  ) {
    const userExist =
      (await this.prisma.users.count({
        where: { id: createAudioDto.authorId },
      })) !== 0;

    if (!userExist) {
      throw new Error('User not found');
    }

    return await this.prisma.audios.create({
      data: {
        audio: createAudioDto.file.path,
        title: createAudioDto.title,
        subtitle: createAudioDto.subtitle,
        authorId: createAudioDto.authorId,
      },
    });
  }

  async findAll() {
    return await this.prisma.audios.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.audios.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateAudioDto: UpdateAudioDto) {
    return await this.prisma.audios.update({
      where: { id },
      data: updateAudioDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.audios.delete({
      where: { id },
    });
  }
}
