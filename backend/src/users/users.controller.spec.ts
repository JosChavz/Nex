// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';
// import { SkillsService } from '../skills/skills.service';
// import { AuthGuard } from '@thallesp/nestjs-better-auth';
// import { CreateUserDto } from './dto/create-user.dto';
// import { User, UserRole, UserState } from './entities/user.entity';
// import { randomUUID } from 'crypto';
// import { v4 as uuidv4 } from 'uuid';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { ForbiddenException, NotFoundException } from '@nestjs/common';
// import { Skill } from '../skills/entities/skill.entity';
// import { idArrayDto } from 'entities/idArray.dto';
// import { AuthToken } from '../auth/auth.interface';
//
// describe('UsersController', () => {
//   let controller: UsersController;
//   const created_at = new Date();
//   let updated_at = created_at; // Subject to change
//
//   const mockSkills: Skill[] = [
//     {
//       id: uuidv4(),
//       name: 'TypeORM',
//       created_at,
//       updated_at,
//     },
//     {
//       id: uuidv4(),
//       name: 'NestJS',
//       created_at,
//       updated_at,
//     },
//     {
//       id: uuidv4(),
//       name: 'Docker',
//       created_at,
//       updated_at,
//     },
//   ];
//
//   const userCody: User = {
//     id: uuidv4(),
//     name: 'Cody',
//     email: 'cody@ucsc.edu',
//     password: 'cody123',
//     role: UserRole.Admin,
//     state: UserState.Active,
//     profilePic: '',
//     created_at,
//     updated_at,
//     skills: [],
//     projectsOwned: [],
//     projectsContributed: [],
//   };
//
//   const userJose: User = {
//     id: uuidv4(),
//     name: 'Jose',
//     email: 'jose@ucsc.edu',
//     password: 'jose123',
//     role: UserRole.User,
//     state: UserState.Active,
//     profilePic: '',
//     created_at,
//     updated_at,
//     skills: [],
//     projectsOwned: [],
//     projectsContributed: [],
//   };
//
//   const userEric: User = {
//     id: uuidv4(),
//     name: 'Eric',
//     email: 'eric@ucsc.edu',
//     password: 'cody123',
//     role: UserRole.Moderator,
//     state: UserState.Active,
//     profilePic: '',
//     created_at,
//     updated_at,
//     skills: [],
//     projectsOwned: [],
//     projectsContributed: [],
//   };
//
//   let mockUsers: User[] = [userCody, userJose, userEric];
//
//   const userLookup = (id: string) =>
//     mockUsers.find((user: User) => user.id == id);
//   const skillLookup = (skillIds: idArrayDto) => {
//     // Looping through the skillIds DTO
//     return skillIds.ids.map((id: string) => {
//       // Loop through the mock skill array
//       return mockSkills.find((skill: Skill) => skill.id === id);
//     });
//   };
//
//   const mockUserService = {
//     create: jest
//       .fn()
//       .mockImplementation(
//         async (createUserDto: CreateUserDto): Promise<User> => {
//           return {
//             ...createUserDto,
//             id: randomUUID(),
//             created_at,
//             updated_at,
//             skills: [],
//             projectsOwned: [],
//             projectsContributed: [],
//           };
//         },
//       ),
//     findAll: jest
//       .fn()
//       .mockImplementation(async (): Promise<User[]> => mockUsers),
//     findOne: jest.fn().mockImplementation(async (id: string): Promise<User> => {
//       const existingUser = userLookup(id);
//       if (!existingUser) throw new NotFoundException('User is not found');
//       return existingUser;
//     }),
//     update: jest
//       .fn()
//       .mockImplementation(
//         async (id: string, updateUserDto: UpdateUserDto): Promise<User> => {
//           updated_at = new Date();
//           const prevUser = userLookup(id);
//           if (!prevUser) throw new NotFoundException('User is not found');
//           return {
//             ...prevUser,
//             ...updateUserDto,
//             updated_at,
//           };
//         },
//       ),
//     remove: jest.fn().mockImplementation(userLookup),
//     updateSkills: jest
//       .fn()
//       .mockImplementation((id: string, skillIds: idArrayDto): Promise<User> => {
//         const newSkills: Skill[] = skillLookup(skillIds);
//         const currentUser: User = userLookup(id);
//         if (!currentUser) throw new NotFoundException('User is not found');
//
//         currentUser.skills = newSkills;
//
//         return Promise.resolve(currentUser);
//       }),
//   };
//
//   const mockSkillsService = {};
//
//   const mockAuthGuard = {
//     canActivate: (context) => {
//       const req = context.switchToHttp().getRequest();
//       req.user = {
//         username: mockUsers[0].name,
//         id: mockUsers[0].id,
//         role: mockUsers[0].role,
//       };
//       return true;
//     },
//   };
//
//   beforeEach(async () => {
//     mockUsers = [userCody, userJose, userEric];
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UsersController],
//       providers: [UsersService, SkillsService],
//     })
//       .overrideProvider(UsersService)
//       .useValue(mockUserService)
//       .overrideProvider(SkillsService)
//       .useValue(mockSkillsService)
//       .overrideGuard(AuthGuard)
//       .useValue(mockAuthGuard)
//       .compile();
//
//     controller = module.get<UsersController>(UsersController);
//     jest.clearAllMocks();
//   });
//
//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
//
//   it('create a new user', async () => {
//     const newUserData: CreateUserDto = {
//       name: 'Cody',
//       email: 'cody@ucsc.edu',
//       password: 'cody123',
//       role: UserRole.Admin,
//       state: UserState.Active,
//       profilePic: '',
//     };
//
//     expect(await controller.create(newUserData)).toEqual({
//       id: expect.any(String),
//       ...newUserData,
//       created_at,
//       updated_at,
//       skills: [],
//       projectsOwned: [],
//       projectsContributed: [],
//     });
//     expect(mockUserService.create).toHaveBeenCalledWith(newUserData);
//   });
//
//   it('find all mockUsers', async () => {
//     expect(await controller.findAll()).toEqual(mockUsers);
//     expect(mockUserService.findAll).toHaveBeenCalled();
//   });
//
//   it('find a specific user', async () => {
//     expect(await controller.findOne(mockUsers[0].id)).toEqual(mockUsers[0]);
//   });
//
//   it('throws an exception if a user cannot be found', async () => {
//     await expect(controller.findOne('abc')).rejects.toThrow(NotFoundException);
//   });
//
//   it('updates user information', async () => {
//     const currUser: User = userJose; // UserRole = User
//     const userUpdate: UpdateUserDto = {
//       name: 'Jose Chavez',
//       state: UserState.Inactive,
//       role: UserRole.Admin, // NOT GOOD
//     };
//
//     const loggedInUser: AuthToken = {
//       username: currUser.name,
//       id: currUser.id,
//       role: currUser.role,
//     };
//
//     expect(
//       await controller.update(currUser.id, userUpdate, loggedInUser),
//     ).toEqual({
//       ...currUser,
//       ...userUpdate,
//       updated_at,
//     });
//   });
//
//   it('throws an exception to update user if id is not found', async () => {
//     const loggedInUser: AuthToken = {
//       username: userJose.name,
//       id: userJose.id,
//       role: userJose.role,
//     };
//     await expect(controller.update('23', {}, loggedInUser)).rejects.toThrow(
//       ForbiddenException,
//     );
//   });
//
//   it('allows for user to delete their own account', async () => {
//     expect(await controller.remove(mockUsers[0].id)).toEqual(mockUsers[0]);
//   });
//
//   it('updates user mockSkills', async () => {
//     const currUser: User = userJose;
//     const skillIds: idArrayDto = {
//       ids: [mockSkills[0].id],
//     };
//     const currAuthToken: AuthToken = {
//       username: currUser.name,
//       id: currUser.id,
//       role: currUser.role,
//     };
//
//     const expectedResult: User = {
//       ...currUser,
//       skills: [mockSkills[0]],
//     };
//     expect(
//       await controller.updateSkills(currUser.id, skillIds, currAuthToken),
//     ).toEqual(expectedResult);
//   });
//
//   it("throws an exception when user tries to update another user's skills", async () => {
//     const currUser: User = userJose;
//     const skillIds: idArrayDto = {
//       ids: [mockSkills[0].id],
//     };
//     const currAuthToken: AuthToken = {
//       username: userCody.name,
//       id: userCody.id,
//       role: userCody.role,
//     };
//     await expect(
//       controller.updateSkills(currUser.id, skillIds, currAuthToken),
//     ).rejects.toThrow(ForbiddenException);
//     expect(mockUserService.updateSkills).not.toHaveBeenCalled();
//   });
// });
