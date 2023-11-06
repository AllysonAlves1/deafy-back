import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostagensModule } from './postagens/postagens.module';
import { AudiosModule } from './audios/audios.module';

@Module({
  imports: [UsersModule, PostagensModule, AudiosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
