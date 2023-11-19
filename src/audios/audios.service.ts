import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAudioDto } from './dto/create-audio.dto';
import { UpdateAudioDto } from './dto/update-audio.dto';
import { PrismaService } from '../prisma/prisma.service';
import { InvalidRelationError } from '../errors/invalid-relation.error';
import { Category } from '@prisma/client';

@Injectable()
export class AudiosService {
  constructor(private prisma: PrismaService) {}
  async createAudio(
    createAudioDto: CreateAudioDto & {
      files: { audio: Express.Multer.File; image: Express.Multer.File };
    },
  ) {
    const userExist =
      (await this.prisma.users.count({
        where: { id: createAudioDto.authorId },
      })) !== 0;

    if (!userExist) {
      throw new InvalidRelationError('User not found');
    }

    return await this.prisma.audios.create({
      data: {
        title: createAudioDto.title,
        authorId: createAudioDto.authorId,
        file_path: createAudioDto.files.audio[0].path,
        image: createAudioDto.files.image[0].path,
      },
    });
  }

  async createPost(
    createAudioDto: CreateAudioDto & { file: Express.Multer.File },
  ) {
    const userExist =
      (await this.prisma.users.count({
        where: { id: createAudioDto.authorId, role: 'ADMIN' },
      })) !== 0;

    if (!userExist) {
      throw new UnauthorizedException('User not found or not permitted');
    }

    return await this.prisma.audios.create({
      data: {
        title: createAudioDto.title,
        category: createAudioDto.category,
        authorId: createAudioDto.authorId,
        file_path: createAudioDto.file.path,
      },
    });
  }

  async findAll(category: Category) {
    return await this.prisma.audios.findMany({
      where: {
        category: category,
      },
    });
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
