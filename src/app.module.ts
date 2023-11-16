import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AudiosModule } from './audios/audios.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, AudiosModule, PostsModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
