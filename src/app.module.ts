import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AudiosModule } from './audios/audios.module';
import { PrismaModule } from './prisma/prisma.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    UsersModule,
    AudiosModule,
    PrismaModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 10000,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
