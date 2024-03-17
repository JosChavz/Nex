import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { General } from '../../../entities/general.entity';

export enum UserRole {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User',
}

export const ALL_USER_ROLES: UserRole[] = [
  UserRole.Admin,
  UserRole.Moderator,
  UserRole.User,
];

export enum UserState {
  Onboarding = 'Onboarding',
  Active = 'Active',
  Inactive = 'Inactive',
}

@Entity({
  name: 'users',
})
export class User extends General {
  @ApiProperty()
  @Column({
    type: 'text',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  password: string;

  @ApiProperty()
  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @ApiProperty()
  profilePic: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserState,
    default: UserState.Onboarding,
  })
  @ApiProperty({ enum: UserState })
  state: UserState;
}
