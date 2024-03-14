import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Database } from './database/database';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UsersModule, AuthModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, Database],
})
export class AppModule {}
