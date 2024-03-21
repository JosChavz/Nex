import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from '../skills/entities/skill.entity';
import { idArrayDto } from '../../entities/idArray.dto';

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private users: Repository<User>,
    @InjectRepository(Skill)
    private skills: Repository<Skill>,
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
    const existingUser: User | null = await this.users.findOne({
      where: {
        id,
      },
    });

    if (!existingUser) throw new NotFoundException('User is not found');

    return existingUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userExists = await this.users.count({
      where: { id },
    });
    if (!userExists) throw new NotFoundException('User is not found');

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

  async updateSkills(userId: string, skillIds: idArrayDto) {
    const user: User = await this.users.findOne({
      where: {
        id: userId,
      },
      relations: ['skills'],
    });
    user.skills = await this.skills.findBy({
      id: In(skillIds.ids),
    });
    await this.users.save(user);
    return user;
  }
}
