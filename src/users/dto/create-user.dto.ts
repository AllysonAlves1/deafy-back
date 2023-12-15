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
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: false })
  email: string;
  @ApiProperty({ required: false })
  password: string;
  @IsOptional()
  image?: string;
  @ApiProperty({ required: false, enum: Role })
  role: Role;
}

export class UpdateUserWithUploadDto extends CreateUserDto {
  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  image: string;
}
