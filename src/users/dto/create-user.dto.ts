import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsNotEmpty,
  MaxLength,
  IsString,
  MinLength,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  @MinLength(3)
  name: string;
  @IsEmail()
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @IsOptional()
  image?: string;
  @ApiProperty({ enum: Role })
  role: Role;
}
