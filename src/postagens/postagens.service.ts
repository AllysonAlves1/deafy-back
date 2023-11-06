import { Injectable } from '@nestjs/common';
import { CreatePostagenDto } from './dto/create-postagen.dto';
import { UpdatePostagenDto } from './dto/update-postagen.dto';

@Injectable()
export class PostagensService {
  create(createPostagenDto: CreatePostagenDto) {
    return 'This action adds a new postagen';
  }

  findAll() {
    return `This action returns all postagens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postagen`;
  }

  update(id: number, updatePostagenDto: UpdatePostagenDto) {
    return `This action updates a #${id} postagen`;
  }

  remove(id: number) {
    return `This action removes a #${id} postagen`;
  }
}
