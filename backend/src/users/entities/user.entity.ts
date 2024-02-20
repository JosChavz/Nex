import {ApiProperty} from "@nestjs/swagger";
import {IsEmail} from "class-validator";

export enum UserRole {
    Admin = 'Admin',
    Moderator = 'Moderator',
    User = 'User',
}

export enum UserState {
    Onboarding = 'Onboarding',
    Active = 'Active',
}

export class User {
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    profilePic: string;
    @ApiProperty({enum: UserRole})
    role: UserRole;
    @ApiProperty({enum: UserState})
    state: UserState;
    @ApiProperty()
    created_at: Date;
    @ApiProperty()
    updated_at: Date;
}
