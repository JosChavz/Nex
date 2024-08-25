import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class SignInDto {
  @IsEmail()
  @ApiProperty()
  username: string;
}
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto.username);
  }
}
