import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAudioDto } from './dto/create-audio.dto';
import { UpdateAudioDto } from './dto/update-audio.dto';
import { PrismaService } from '../prisma/prisma.service';
import { InvalidRelationError } from '../errors/invalid-relation.error';
import { Category } from '@prisma/client';

@Injectable()
export class AudiosService {
  constructor(private prisma: PrismaService) {}
  async createPost(
    id,
    createAudioDto: CreateAudioDto & {
      audioUrl;
      imageUrl;
    },
  ) {
    const userExist =
      (await this.prisma.users.count({
        where: { id, role: 'ADMIN' },
      })) !== 0;

    if (!userExist) {
      throw new InvalidRelationError('User not found or not permitted');
    }

    return await this.prisma.audios.create({
      data: {
        authorId: id,
        title: createAudioDto.title,
        category: createAudioDto.category,
        audio: createAudioDto.audioUrl,
        image: createAudioDto.imageUrl,
      },
    });
  }

  async createAudio(id, createAudioDto: CreateAudioDto & { audioUrl }) {
    const userExist =
      (await this.prisma.users.count({
        where: { id },
      })) !== 0;

    if (!userExist) {
      throw new UnauthorizedException('User not found');
    }

    return await this.prisma.audios.create({
      data: {
        authorId: id,
        title: createAudioDto.title,
        audio: createAudioDto.audioUrl,
        subtitle: createAudioDto.subtitle,
      },
    });
  }

  async findAll() {
    return await this.prisma.audios.findMany({
      where: {
        category: {
          in: ['MUSIC', 'PODCAST', 'AUDIOBOOK'],
        },
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findAllCategory(category: Category) {
    return await this.prisma.audios.findMany({
      where: {
        category: category,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.audios.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async update(id: number, idUser: number, updateAudioDto: UpdateAudioDto) {
    const audioToUpdate = await this.prisma.audios.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!audioToUpdate || audioToUpdate.authorId !== idUser) {
      throw new UnauthorizedException(
        'User not authorized to update this audio',
      );
    }
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
