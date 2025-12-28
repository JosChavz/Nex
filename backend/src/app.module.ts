import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './auth';
import { User } from './users/entities/user.entity';
import { SkillsModule } from './skills/skills.module';
import { Skill } from './skills/entities/skill.entity';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/entities/project.entity';
import { UsersController } from './users/users.controller';

require('dotenv').config();

@Module({
  imports: [
    AuthModule.forRoot(auth),
    // UsersModule,
    // SkillsModule,
    // ProjectsModule,
  ],
  controllers: [UsersController],
})
export class AppModule {}
