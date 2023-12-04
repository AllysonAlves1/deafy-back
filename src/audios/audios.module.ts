import { Module } from '@nestjs/common';
import { AudiosService } from './audios.service';
import { AudiosController } from './audios.controller';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';
import { AzureStorageService } from './azure.service';

const storage = multer.memoryStorage(); // Usando memoryStorage para armazenar na memória

@Module({
  imports: [
    MulterModule.register({
      storage,
    }),
  ],
  controllers: [AudiosController],
  providers: [AudiosService, AzureStorageService],
})
export class AudiosModule {}
