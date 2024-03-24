import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, UserRole, UserState } from './entities/user.entity';
import { Skill } from '../skills/entities/skill.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { idArrayDto } from '../../entities/idArray.dto';

describe('UsersService', () => {
  let service: UsersService;
  const mockUserRepository = {
    insert: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    count: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    save: jest.fn(),
  };
  const mockSkillRepository = {
    findBy: jest.fn(),
  };

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

    jest.clearAllMocks();
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

  it('should be unable to create a user', async () => {
    const newUserInfo: CreateUserDto = {
      name: 'Jose',
      email: 'jose@ucsc.edu',
      password: 'password',
      role: UserRole.User,
      state: UserState.Active,
      profilePic: '',
    };

    mockUserRepository.insert.mockRejectedValueOnce(Error);

    await expect(service.create(newUserInfo)).rejects.toThrow(
      BadRequestException,
    );
    expect(mockUserRepository.findOne).not.toHaveBeenCalled();
  });

  it('should find all users', async () => {
    mockUserRepository.find.mockResolvedValueOnce([userCody]);
    expect(await service.findAll()).toStrictEqual([userCody]);
  });

  it('should find a user given an id', async () => {
    const id = userCody.id;

    mockUserRepository.findOne.mockResolvedValueOnce(userCody);

    expect(await service.findOne(id)).toEqual(userCody);
  });

  it('should not be able to find a user given a fake id', async () => {
    mockUserRepository.findOne.mockResolvedValueOnce(null);

    await expect(service.findOne('abc')).rejects.toThrow(NotFoundException);
  });

  it('should update the user', async () => {
    const id = userCody.id;
    const updatedInformation: UpdateUserDto = {
      name: 'Cody Ko',
    };
    userCody.name = updatedInformation.name;

    mockUserRepository.count.mockResolvedValueOnce(1);
    mockUserRepository.update.mockResolvedValueOnce(null);
    mockUserRepository.findOne.mockResolvedValueOnce(userCody);

    expect(await service.update(id, updatedInformation)).toBe(userCody);
  });

  it('should not be able to update due to not finding the user', async () => {
    mockUserRepository.count.mockResolvedValueOnce(0);
    await expect(service.update('123', {})).rejects.toThrow(NotFoundException);
    expect(mockUserRepository.update).not.toHaveBeenCalled();
    expect(mockUserRepository.findOne).not.toHaveBeenCalled();
  });

  it('should remove the user from the database', async () => {
    const id: string = userCody.id;
    mockUserRepository.findOne.mockResolvedValueOnce(userCody);
    mockUserRepository.remove.mockResolvedValueOnce(userCody);
    expect(await service.remove(id)).toStrictEqual(userCody);
  });

  it('should be unable to remove the user from the database if user does not exist', async () => {
    mockUserRepository.findOne.mockResolvedValueOnce(null);
    await expect(service.remove('123')).rejects.toThrow(NotFoundException);
    expect(mockUserRepository.remove).not.toHaveBeenCalled();
  });

  it('should update the user skills', async () => {
    const tempSkills: Skill[] = [
      {
        id: uuidv4(),
        name: 'TypeORM',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    const skillIds: idArrayDto = new idArrayDto();
    skillIds.ids = tempSkills.map((skill: Skill) => skill.id);
    const userId: string = userCody.id;

    mockUserRepository.findOne.mockResolvedValueOnce(userCody);

    userCody.skills = tempSkills;

    mockSkillRepository.findBy.mockResolvedValueOnce(tempSkills);
    mockUserRepository.save.mockResolvedValueOnce(null);

    expect(await service.updateSkills(userId, skillIds)).toStrictEqual(
      userCody,
    );
  });
});
