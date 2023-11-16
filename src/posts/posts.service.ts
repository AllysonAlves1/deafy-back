import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}
  async createPost(createPostDto: CreatePostDto) {
    return await this.prisma.posts.create({
      data: createPostDto,
    });
  }

  async findAll() {
    return await this.prisma.posts.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.posts.findUnique({
      where: { id },
    });
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto) {
    return await this.prisma.posts.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async removePost(id: number) {
    return await this.prisma.posts.delete({
      where: { id },
    });
  }
}
