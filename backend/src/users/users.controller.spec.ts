import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SkillsService } from '../skills/skills.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole, UserState } from './entities/user.entity';
import { randomUUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { Skill } from '../skills/entities/skill.entity';
import { idArrayDto } from 'entities/idArray.dto';

describe('UsersController', () => {
  let controller: UsersController;
  const created_at = new Date();
  let updated_at = created_at; // Subject to change

  const skills: Skill[] = [
    {
      id: uuidv4(),
      name: 'TypeORM',
      created_at,
      updated_at,
    },
    {
      id: uuidv4(),
      name: 'NestJS',
      created_at,
      updated_at,
    },
    {
      id: uuidv4(),
      name: 'Docker',
      created_at,
      updated_at,
    },
  ];

  const users: User[] = [
    {
      id: uuidv4(),
      name: 'Cody',
      email: 'cody@ucsc.edu',
      password: 'cody123',
      role: UserRole.Admin,
      state: UserState.Active,
      profilePic: '',
      created_at,
      updated_at,
      skills: [],
      projectsOwned: [],
      projectsContributed: [],
    },
    {
      id: uuidv4(),
      name: 'Jose',
      email: 'jose@ucsc.edu',
      password: 'jose123',
      role: UserRole.User,
      state: UserState.Active,
      profilePic: '',
      created_at,
      updated_at,
      skills: [],
      projectsOwned: [],
      projectsContributed: [],
    },
    {
      id: uuidv4(),
      name: 'Eric',
      email: 'eric@ucsc.edu',
      password: 'cody123',
      role: UserRole.Moderator,
      state: UserState.Active,
      profilePic: '',
      created_at,
      updated_at,
      skills: [],
      projectsOwned: [],
      projectsContributed: [],
    },
  ];

  const userLookup = (id: string) => users.find((user: User) => user.id == id);
  const skillLookup = (id: string) =>
    skills.find((skill: Skill) => skill.id == id);

  const mockUserService = {
    create: jest
      .fn()
      .mockImplementation(
        async (createUserDto: CreateUserDto): Promise<User> => {
          return {
            ...createUserDto,
            id: randomUUID(),
            created_at,
            updated_at,
            skills: [],
            projectsOwned: [],
            projectsContributed: [],
          };
        },
      ),
    findAll: jest.fn().mockImplementation(async (): Promise<User[]> => users),
    findOne: jest.fn().mockImplementation(async (id: string): Promise<User> => {
      const existingUser = userLookup(id);
      if (!existingUser) throw new NotFoundException('User is not found');
      return existingUser;
    }),
    update: jest
      .fn()
      .mockImplementation(
        async (id: string, updateUserDto: UpdateUserDto): Promise<User> => {
          updated_at = new Date();
          const prevUser = userLookup(id);
          if (!prevUser) throw new NotFoundException('User is not found');
          return {
            ...prevUser,
            ...updateUserDto,
            updated_at,
          };
        },
      ),
    remove: jest.fn().mockImplementation(userLookup),
    updateSkills: jest
      .fn()
      .mockImplementation((id: string, skillIds: idArrayDto) => {
        // const skill: Skill = skillLookup(skillIds)
      }),
  };

  const mockSkillsService = {};

  const mockAuthGuard = {
    canActivate: (context) => {
      const req = context.switchToHttp().getRequest();
      req.user = {
        username: users[0].name,
        id: users[0].id,
        role: users[0].role,
      };
      return true;
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, SkillsService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .overrideProvider(SkillsService)
      .useValue(mockSkillsService)
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create a new user', async () => {
    const newUserData: CreateUserDto = {
      name: 'Cody',
      email: 'cody@ucsc.edu',
      password: 'cody123',
      role: UserRole.Admin,
      state: UserState.Active,
      profilePic: '',
    };

    expect(await controller.create(newUserData)).toEqual({
      id: expect.any(String),
      ...newUserData,
      created_at,
      updated_at,
      skills: [],
      projectsOwned: [],
      projectsContributed: [],
    });
    expect(mockUserService.create).toHaveBeenCalledWith(newUserData);
  });

  it('find all users', async () => {
    expect(await controller.findAll()).toEqual(users);
    expect(mockUserService.findAll).toHaveBeenCalled();
  });

  it('find a specific user', async () => {
    expect(await controller.findOne(users[0].id)).toEqual(users[0]);
  });

  it('throws an exception if a user cannot be found', async () => {
    await expect(controller.findOne('abc')).rejects.toThrow(NotFoundException);
  });

  it('updates user information', async () => {
    const firstUser: User = users[0];
    const userUpdate: UpdateUserDto = {
      name: 'Jose Chavez',
      state: UserState.Inactive,
      role: UserRole.Admin,
    };

    expect(await controller.update(firstUser.id, userUpdate)).toEqual({
      ...firstUser,
      ...userUpdate,
      updated_at,
    });
  });

  it('throws an exception to update user if id is not found', async () => {
    await expect(controller.update('23', {})).rejects.toThrow(
      NotFoundException,
    );
  });

  // TODO: Needs to admit Roles because only Admins have access to this controller
  it('allows for user to delete their own account', async () => {
    expect(await controller.remove(users[0].id)).toEqual(users[0]);
  });

  it('updates user skills', async () => {});
});
