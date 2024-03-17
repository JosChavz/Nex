import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Public, Roles } from '../roles/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Skill } from './entities/skill.entity';

@UseGuards(AuthGuard)
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @ApiBearerAuth()
  @Roles(UserRole.Admin, UserRole.Moderator)
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createSkillDto: CreateSkillDto): Promise<Skill> {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  @Public()
  async findAll(): Promise<Skill[]> {
    return this.skillsService.findAll();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Skill> {
    return this.skillsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe({ transform: true }))
  @Roles(UserRole.Admin, UserRole.Moderator)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ): Promise<Skill> {
    return this.skillsService.update(id, updateSkillDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(UserRole.Admin, UserRole.Moderator)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<Skill> {
    return this.skillsService.remove(id);
  }
}
