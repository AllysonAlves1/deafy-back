import { Module } from '@nestjs/common';
import { AudiosService } from './audios.service';
import { AudiosController } from './audios.controller';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + Math.random() + path.extname(file.originalname));
  },
});
@Module({
  imports: [
    MulterModule.register({
      storage,
    }),
  ],
  controllers: [AudiosController],
  providers: [AudiosService],
})
export class AudiosModule {}
