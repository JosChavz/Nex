import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private users: Repository<User>,
  ) {}

  // TODO: Requires to be encrypted to login!
  async login(email: string, password: string): Promise<User> {
    return await this.users.findOneBy({
      email,
      password,
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.users.insert(createUserDto);
    return await this.users.findOne({
      where: {
        email: createUserDto.email,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.users.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.users.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.users.update(id, updateUserDto);
    return await this.users.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<User> {
    return await this.users.remove(await this.users.findOne({ where: { id } }));
  }
}
