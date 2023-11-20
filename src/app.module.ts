import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AudiosModule } from './audios/audios.module';
import { PrismaModule } from './prisma/prisma.module';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AudiosModule,
    PrismaModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 10000,
    }),
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
