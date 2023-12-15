import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { AzureStorageService } from '../azure/azure.service';

@Module({
  imports: [ConfigModule],
  controllers: [UsersController],
  providers: [UsersService, AzureStorageService],
})
export class UsersModule {}
