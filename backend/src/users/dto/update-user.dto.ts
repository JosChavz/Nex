import {ApiHideProperty, ApiProperty, PartialType} from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiHideProperty()
    updated_at: Date = new Date();
}
