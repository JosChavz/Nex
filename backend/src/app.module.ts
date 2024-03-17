import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { SkillsModule } from './skills/skills.module';
import { Skill } from './skills/entities/skill.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: process.env.POSTGRES_PORT
        ? parseInt(process.env.POSTGRES_PORT, 10)
        : 5432,
      username: process.env.POSTGRES_USER || 'root',
      password: process.env.POSTGRES_PASSWORD || 'root',
      database: process.env.POSTGRES_DB || 'root',
      entities: [User, Skill],
      synchronize: true, // DO NOT USE IN PRODUCTION
    }),
    UsersModule,
    AuthModule,
    SkillsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
