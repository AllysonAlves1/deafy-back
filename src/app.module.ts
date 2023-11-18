import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AudiosModule } from './audios/audios.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, AudiosModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
