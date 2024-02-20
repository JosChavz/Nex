import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from "./entities/user.entity";

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) : Promise<User> {
    return;
  }

  async findAll(): Promise<User[]> {
    return;
  }

  async findOne(id: number) : Promise<User> {
    return;
  }

  async update(id: number, updateUserDto: UpdateUserDto) : Promise<User> {
    return;
  }

  async remove(id: number) : Promise<User> {
    return;
  }
}
