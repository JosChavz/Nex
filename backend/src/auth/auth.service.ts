import { Injectable, Dependencies, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {JwtService} from "@nestjs/jwt";
import {User} from "../users/entities/user.entity";

@Injectable()
@Dependencies(UsersService, JwtService)
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
        this.usersService = usersService;
    }

    async signIn(username: string, pass: string) {
        const user: User = await this.usersService.login(username, pass);
        if (!user) {
            throw new UnauthorizedException(); // Wouldn't it be a 404?
        }

        const payload = { username: user.name, sub: user.id };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}