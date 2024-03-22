import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, UserRole, UserState } from './entities/user.entity';
import { Skill } from '../skills/entities/skill.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  const mockUserRepository = {
    insert: jest.fn(),
    findOne: jest.fn(),
  };
  const mockSkillRepository = {};

  const created_at = new Date();
  const updated_at = created_at; // Subject to change

  const userCody: User = {
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
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Skill),
          useValue: mockSkillRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a user`', async () => {
    const newUserInfo: CreateUserDto = {
      name: 'Jose',
      email: 'jose@ucsc.edu',
      password: 'password',
      role: UserRole.User,
      state: UserState.Active,
      profilePic: '',
    };

    mockUserRepository.insert.mockResolvedValueOnce(null);
    mockUserRepository.findOne.mockResolvedValueOnce(newUserInfo);

    expect(await service.create(newUserInfo)).toEqual(newUserInfo);
  });
});
