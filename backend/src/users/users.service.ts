import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from "./entities/user.entity";
import pool from "../db";

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) : Promise<User> {
    const t = 'INSERT INTO users (username, email, password, role, state) VALUES ($1, $2, $3, $4, $5) RETURNING id';

    const q = {
        text: t,
        values: [createUserDto.name, createUserDto.email, createUserDto.password, createUserDto.role, createUserDto.state]
    }

    const res = await pool.query(q)
    console.log(res.rows[0])

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
