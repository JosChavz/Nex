import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SkillsModule } from '../skills/skills.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule.forFeature([User])],
  imports: [TypeOrmModule.forFeature([User]), SkillsModule],
})
export class UsersModule {}
