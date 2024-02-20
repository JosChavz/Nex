import {ApiProperty} from "@nestjs/swagger";
import {IS_UUID, IsEmail, IsUUID} from "class-validator";

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
    @IsUUID()
    id: string;
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
