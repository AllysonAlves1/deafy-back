import { Role } from '@prisma/client';
import {
  IsNotEmpty,
  MaxLength,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  @MinLength(3)
  name: string;
  email: string;
  password: string;
  @IsOptional()
  image?: string;
  role: Role;
}
