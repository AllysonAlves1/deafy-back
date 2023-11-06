import { Module } from '@nestjs/common';
import { PostagensService } from './postagens.service';
import { PostagensController } from './postagens.controller';

@Module({
  controllers: [PostagensController],
  providers: [PostagensService],
})
export class PostagensModule {}
