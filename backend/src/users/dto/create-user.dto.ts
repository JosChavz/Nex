import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserState } from '../entities/user.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Unique } from 'typeorm';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @ApiProperty()
  @Unique(['email'])
  email: string;

  @ApiProperty({
    enum: UserRole,
    required: false,
    default: UserRole.User,
  })
  role: UserRole = UserRole.User;

  @ApiProperty({
    enum: UserState,
    required: false,
    default: UserState.Onboarding,
  })
  state: UserState;

  @ApiProperty({
    type: String,
    description: 'The profile picture of the user',
    required: false,
  })
  profilePic: string;
}
