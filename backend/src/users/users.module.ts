import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SkillsModule } from '../skills/skills.module';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [SkillsModule, ProjectsModule],
})
export class UsersModule {}
