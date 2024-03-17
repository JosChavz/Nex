import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User',
}

export enum UserState {
  Onboarding = 'Onboarding',
  Active = 'Active',
}

@Entity()
export class User {
  @ApiProperty()
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    type: 'text',
    nullable: false,
  })
  name: string;

  @Column()
  password: string;

  @ApiProperty()
  @Column({
    type: 'text',
    nullable: false,
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

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty()
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ApiProperty()
  updated_at: Date;
}
