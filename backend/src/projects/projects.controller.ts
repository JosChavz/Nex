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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Public, Roles } from '../roles/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ALL_USER_ROLES, UserRole } from '../users/entities/user.entity';
import { AuthUser } from '../users/users.decorator';
import { AuthToken } from '../auth/auth.interface';

@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiBearerAuth()
  @Roles(UserRole.User)
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @AuthUser() user: AuthToken,
  ) {
    return this.projectsService.create(createProjectDto, user.id);
  }

  @Get()
  @Public()
  async findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findOne(id);
  }

  @Get(':id/contributors')
  async getContributors(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.getContributors(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Roles(...ALL_USER_ROLES)
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @AuthUser() user: AuthToken,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    // Admins and Moderators can bypass the check
    if (user.role !== UserRole.User) {
      return this.projectsService.update(id, updateProjectDto, user.id, true);
    }

    return this.projectsService.update(id, updateProjectDto, user.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(UserRole.User, UserRole.Admin)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @AuthUser() user: AuthToken,
  ) {
    return this.projectsService.remove(
      id,
      user.id,
      user.role !== UserRole.User,
    );
  }
}
