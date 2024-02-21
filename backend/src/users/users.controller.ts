import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRole } from './entities/user.entity';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 409, description: 'UserAlreadyExists.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    let user: User;

    try {
      user = await this.usersService.create(createUserDto);
    } catch (e) {
      // https://www.postgresql.org/docs/current/errcodes-appendix.html
      // 23505 = unique_violation
      switch (e.message) {
        case '23505':
          throw new HttpException('Email already in use', HttpStatus.CONFLICT);
        default:
          throw new HttpException(
            'Internal server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }

    return user;
  }

  @Get()
  @ApiBearerAuth()
  @Roles(UserRole.Admin, UserRole.Moderator)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(+id);
  }
}
