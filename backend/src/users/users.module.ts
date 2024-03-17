import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './users';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService, Users],
  exports: [UsersService, TypeOrmModule.forFeature([User])],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
