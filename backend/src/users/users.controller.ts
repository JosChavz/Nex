import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ALL_USER_ROLES, User, UserRole } from './entities/user.entity';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Public, Roles } from '../roles/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 409, description: 'UserAlreadyExists.' })
  @Public()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @Public()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Roles(...ALL_USER_ROLES)
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.remove(id);
  }

  @Put(':id/skills')
  @ApiBearerAuth()
  @Roles(UserRole.User)
  async updateSkills(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body('skillIds', ParseUUIDPipe) skillIds: string[],
  ): Promise<User> {
    return this.usersService.updateSkills(userId, skillIds);
  }
}
