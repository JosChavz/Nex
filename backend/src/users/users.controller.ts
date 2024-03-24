import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
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
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public, Roles } from '../roles/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser } from './users.decorator';
import { idArrayDto } from '../../entities/idArray.dto';
import { AuthToken } from 'src/auth/auth.interface';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @Public()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @Public()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // TODO: A boolean to get users with their skills to. By default, it should be false.
  @Get(':id')
  @Public()
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  // NOTE: Users with the role User are able to change their Role
  // Not the best option to go with.
  @Patch(':id')
  @ApiBearerAuth()
  @Roles(...ALL_USER_ROLES)
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @AuthUser() user: AuthToken,
  ): Promise<User> {
    // User is unable to update other user's information
    if (id !== user.id && user.role == UserRole.User)
      throw new ForbiddenException(
        'You are not authorized to update this user.',
      );
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
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateSkills(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() skillIds: idArrayDto,
    @AuthUser() user: AuthToken,
  ): Promise<User> {
    // Verify the logged-in user is the same as the user being updated
    if (user.id !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this user.',
      );
    }
    return this.usersService.updateSkills(userId, skillIds);
  }
}
