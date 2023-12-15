import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(authDto: AuthDto) {
    const user = await this.prisma.users.findUnique({
      where: {
        email: authDto.email,
      },
    });

    const userAuth = await bcrypt.compare(authDto.password, user.password);

    if (!userAuth) {
      throw new UnauthorizedException('O email ou senha estão incorretos');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
