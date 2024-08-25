import {
  Injectable,
  Dependencies,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { AuthToken } from './auth.interface';

@Injectable()
@Dependencies(UsersService, JwtService)
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.usersService = usersService;
  }

  async signIn(email: string) {
    const user: User = await this.usersService.login(email);
    if (!user) {
      throw new UnauthorizedException(); // Wouldn't it be a 404?
    }

    const payload: AuthToken = {
      username: user.name,
      id: user.id,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
