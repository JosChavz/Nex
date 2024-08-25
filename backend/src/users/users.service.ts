import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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

  // TODO: Find a safer way to login using Supabase
  async login(email: string): Promise<User> {
    return await this.users.findOne({
      where: {
        email,
      },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      await this.users.insert(createUserDto);
    } catch (e) {
      console.log(e);
      throw new BadRequestException('User already exists.');
    }

    return await this.users.findOne({
      where: {
        email: createUserDto.email,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.users.find();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.users.findOne({
      where: {
        email,
      },
    });
  }

  async findOne(id: string): Promise<User> {
    const existingUser: User = await this.users.findOne({
      where: {
        id,
      },
    });

    if (!existingUser) throw new NotFoundException('User is not found');

    return existingUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userExists: number = await this.users.count({
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
    const existingUser: User = await this.users.findOne({ where: { id } });

    if (!existingUser) throw new NotFoundException('User does not exist.');

    return await this.users.remove(existingUser);
  }

  // Not the best practice due to merging issues
  // NOTE: updateSkills vs addSkills - What is the difference?
  async updateSkills(userId: string, skillIds: idArrayDto): Promise<User> {
    const user: User = await this.users.findOne({
      where: {
        id: userId,
      },
      relations: ['skills'],
    });

    if (!user) throw new NotFoundException('User is not found');

    // TODO: Needs to handle IDs that do not exist in DB
    // findBy -> array of Skill then way to verify is to check the length of
    // skillIds.ids with returned value ??? maybe not worth it
    user.skills = await this.skills.findBy({
      id: In(skillIds.ids),
    });
    await this.users.save(user);
    return user;
  }
}
