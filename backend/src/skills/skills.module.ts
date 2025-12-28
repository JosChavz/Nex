import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';

@Module({
  controllers: [SkillsController],
  providers: [SkillsService],
  imports: [],
  exports: [SkillsService],
})
export class SkillsModule {}
