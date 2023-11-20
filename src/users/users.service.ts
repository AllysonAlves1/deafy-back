import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  // Data Transfer Object - Objeto de Transferencia de Dados
  async createUser(createUserDto: CreateUserDto) {
    return await this.prisma.users.create({
      data: createUserDto,
    });
  }

  async findAll() {
    // Quando retorna os usuários não retorna a senha
    return await this.prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        audios: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.users.findUniqueOrThrow({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.users.findUnique({
      where: { email },
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async removeUser(id: number) {
    return await this.prisma.users.delete({
      where: { id },
    });
  }
}
