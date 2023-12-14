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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Users')
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 500, description: 'Internal Server Error' })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Criar um usuário' })
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

  @ApiOperation({ summary: 'Buscar todos os usuários' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Buscar um usuário' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiBody({
    type: CreateUserDto,
  })
  @ApiOperation({ summary: 'Atualizar um usuário' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Deletar um usuário' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(+id);
  }
}
