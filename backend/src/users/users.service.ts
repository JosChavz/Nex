import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import pool from '../db';

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);

  // TODO: Requires to be encrypted to login!
  async login(email: string, password: string): Promise<User> {
    const t = 'SELECT * FROM users WHERE email = $1 AND password = $2';

    const q = {
      text: t,
      values: [email, password],
    };

    const res = await pool.query(q);

    if (res.rows.length === 0) {
      this.logger.error('User not found');
      return;
    }

    delete res.rows[0].password;

    return res.rows[0] as User;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const t =
      'INSERT INTO users (name, email, password, role, state) VALUES ($1, $2, $3, $4, $5) RETURNING *';

    const q = {
      text: t,
      values: [
        createUserDto.name,
        createUserDto.email,
        createUserDto.password,
        createUserDto.role,
        createUserDto.state,
      ],
    };

    const res = await pool.query(q).catch((e) => {
      this.logger.error(e.detail);
      throw new Error(e.code);
    });

    const user = res.rows[0];
    delete user.password;

    return res.rows[0] as User;
  }

  async findAll(): Promise<User[]> {
    const t = 'SELECT * FROM users';
    const res = await pool.query(t).catch((e) => {
      this.logger.error(e.detail);
      throw new Error(e.code);
    });

    // Deletes password from the response
    for (let i = 0; i < res.rows.length; i++) {
      delete res.rows[i].password;
    }

    return res.rows as User[];
  }

  async findOne(id: number): Promise<User> {
    return;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return;
  }

  async remove(id: number): Promise<User> {
    return;
  }
}
