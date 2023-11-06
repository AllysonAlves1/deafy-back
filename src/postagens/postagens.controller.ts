import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostagensService } from './postagens.service';
import { CreatePostagenDto } from './dto/create-postagen.dto';
import { UpdatePostagenDto } from './dto/update-postagen.dto';

@Controller('postagens')
export class PostagensController {
  constructor(private readonly postagensService: PostagensService) {}

  @Post()
  create(@Body() createPostagenDto: CreatePostagenDto) {
    return this.postagensService.create(createPostagenDto);
  }

  @Get()
  findAll() {
    return this.postagensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postagensService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostagenDto: UpdatePostagenDto,
  ) {
    return this.postagensService.update(+id, updatePostagenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postagensService.remove(+id);
  }
}
