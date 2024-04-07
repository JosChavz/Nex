import { ApiProperty } from '@nestjs/swagger';
import { ProjectState } from '../entities/project.entity';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    type: String,
    description: 'The title of the project',
    required: true,
  })
  @MinLength(3)
  @MaxLength(100)
  @IsNotEmpty()
  title: string;
  @ApiProperty({
    type: String,
    description: 'The description of the project',
    required: false,
  })
  description: string;
  @ApiProperty({
    type: String,
    description: 'The state of the project',
    required: false,
    default: ProjectState.Draft,
  })
  state: ProjectState;
}
