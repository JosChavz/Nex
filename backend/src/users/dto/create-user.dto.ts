import {ApiHideProperty, ApiProperty} from "@nestjs/swagger";
import {UserRole, UserState} from "../entities/user.entity";
import {IsEmail, IsNotEmpty} from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
    @IsEmail()
    @ApiProperty()
    email: string;
    @ApiProperty()
    @IsNotEmpty()
    password: string;
    @ApiProperty({
        enum: UserRole,
        required: false,
        default: UserRole.User,
    })
    role: UserRole = UserRole.User;
    @ApiProperty({
        enum: UserState,
        required: false,
        default: UserState.Onboarding
    })
    state: UserState = UserState.Onboarding;
}
