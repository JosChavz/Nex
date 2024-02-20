import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from "./entities/user.entity";
import pool from "../db";

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) : Promise<User> {
    console.log(createUserDto, 'createUserDto', createUserDto.updated_at, 'createUserDto.updated_at');
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
