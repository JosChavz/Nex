import {ApiProperty} from "@nestjs/swagger";
import {UserRole, UserState} from "../entities/user.entity";

export class CreateUserDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty({
        enum: UserRole,
        required: false,
        default: UserRole.User
    })
    role: UserRole;
    @ApiProperty({
        enum: UserState,
        required: false,
        default: UserState.Onboarding
    })
    state: UserState;
    @ApiProperty({
        required: false,
        default: new Date()
    })
    created_at: Date;
    @ApiProperty({
        required: false,
        default: new Date()
    })
    updated_at: Date;
}
