import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class idArrayDto {
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @IsUUID('4', { each: true })
  ids: string[];
}
