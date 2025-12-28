import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { SkillsModule } from '../skills/skills.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [SkillsModule],
  exports: [ProjectsService],
})
export class ProjectsModule {}
