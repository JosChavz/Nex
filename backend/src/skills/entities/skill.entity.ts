import { Column, Entity } from 'typeorm';
import { General } from '../../../entities/general.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'skills',
})
export class Skill extends General {
  @ApiProperty()
  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  name: string;
}
