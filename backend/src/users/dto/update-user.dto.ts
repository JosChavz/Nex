import {ApiProperty, PartialType} from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        required: false,
        default: new Date()
    })
    updated_at: Date;
}
