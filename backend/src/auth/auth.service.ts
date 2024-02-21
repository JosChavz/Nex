import {
  Injectable,
  Dependencies,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import * as process from "process";
require('dotenv').config();

@Injectable()
@Dependencies(UsersService, JwtService)
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.usersService = usersService;
  }

  async signIn(email: string, pass: string) {
    const user: User = await this.usersService.login(email, pass);
    if (!user) {
      throw new UnauthorizedException(); // Wouldn't it be a 404?
    }

    const payload = {
      username: user.name,
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
