import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashPasswordPipe } from '../pipes/hash-password.pipe';
import { ListUserDTO } from './dto/list-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body() { password, ...createUserDto }: CreateUserDto,
    @Body('password', HashPasswordPipe) passwordHash: string,
  ) {
    const userCreate = await this.usersService.createUser({
      ...createUserDto,
      password: passwordHash,
    });

    return {
      message: 'Usuário criado com sucesso!',
      usuario: new ListUserDTO(
        userCreate.id,
        userCreate.name,
        userCreate.email,
      ),
    };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(+id);
  }
}
