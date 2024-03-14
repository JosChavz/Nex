import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {Users, usersProvider} from './users';
import {DatabaseModule} from "../database/database.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService, Users, ...usersProvider],
  exports: [UsersService],
  imports: [DatabaseModule]
})
export class UsersModule {}
