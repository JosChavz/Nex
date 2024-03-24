import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import setupDataSource from './setup';
import { SkillsModule } from '../src/skills/skills.module';
import { ProjectsModule } from '../src/projects/projects.module';
import { AuthModule } from '../src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { User, UserRole, UserState } from '../src/users/entities/user.entity';
import { userCody } from './users';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../src/users/dto/create-user.dto';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = await setupDataSource();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forRoot({
          synchronize: true,
        }),
        SkillsModule,
        ProjectsModule,
        AuthModule,
        JwtModule.register({
          global: true,
          secret: 'secret',
          signOptions: { expiresIn: '1d' },
        }),
      ],
    })
      .overrideProvider(DataSource)
      .useValue(dataSource)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    // const userRepo: Repository<User> = dataSource.getRepository(User);
    // await userRepo.update(userCody);
    // await userRepo.update(userJose);
    // await userRepo.update(userEric);
  });

  it('GET - get all users', async () => {
    return request(app.getHttpServer())
      .get('/users/')
      .expect(200)
      .then((res) => {
        const users: User[] = res.body;
        expect(users.length).toBeGreaterThan(1);
        // TODO: Should we expect for 3 users to be in there too?
        // expect(users).toContain([userCody]);
      });
  });

  it('GET - should find a user given an ID', async () => {
    const userId: string = userCody.id;
    return request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(200)
      .then((res) => {
        const currUser: User = res.body;
        expect(currUser.name).toEqual(userCody.name);
        expect(currUser.email).toEqual(userCody.email);
        expect(currUser.id).toEqual(userCody.id);
      });
  });

  it('GET - should not be able to find a user with a bad uuid', async () => {
    const tempUUID = uuidv4();

    return request(app.getHttpServer()).get(`/users/${tempUUID}`).expect(404);
  });

  it('GET - should be unable to get User due to mismatch UUID', async () => {
    return request(app.getHttpServer()).get(`/users/abcdefgh`).expect(400);
  });

  it('POST - should be able to create a new user with correct DTO', async () => {
    const newUser: CreateUserDto = {
      name: 'Luna',
      email: 'luna@ucsc.edu',
      password: 'Notsafe123',
      role: UserRole.User,
      state: UserState.Active,
      profilePic: '',
    };

    return request(app.getHttpServer())
      .post(`/users/`)
      .send(newUser)
      .expect(201)
      .then((res) => {
        const currUser: User = res.body;
        expect(currUser.name).toEqual(newUser.name);
        expect(currUser.email).toEqual(newUser.email);
        expect(currUser.role).toEqual(newUser.role);
        expect(currUser.state).toEqual(newUser.state);
        expect(currUser.profilePic).toEqual(newUser.profilePic);
      });
  });

  it('POST - should not be able to create a new user with incorrect DTO - password', async () => {
    const newUser: CreateUserDto = {
      name: 'Luna',
      email: 'luna@ucsc.edu',
      password: 'notsafe',
      role: UserRole.User,
      state: UserState.Active,
      profilePic: '',
    };

    return request(app.getHttpServer())
      .post(`/users/`)
      .send(newUser)
      .expect(400);
  });

  it('POST - should not be able to create a new user with incorrect DTO - email', async () => {
    const newUser: CreateUserDto = {
      name: 'Luna',
      email: 'luna',
      password: 'Notsafe123',
      role: UserRole.User,
      state: UserState.Active,
      profilePic: '',
    };

    return request(app.getHttpServer())
      .post(`/users/`)
      .send(newUser)
      .expect(400);
  });

  it('POST - should not be able to create a new user with the incorrect DTO', async () => {
    const newUser = {
      name: 'Luna',
      email: 'luna@ucsc.edu',
      profilePic: '',
    };

    return request(app.getHttpServer())
      .post(`/users/`)
      .send(newUser)
      .expect(400);
  });

  it('POST - should not be able to create a new user with an existing email', async () => {
    const newUser: CreateUserDto = {
      name: 'Cody 2',
      email: 'cody@ucsc.edu',
      password: 'password123',
      role: UserRole.Admin,
      state: UserState.Active,
      profilePic: '',
    };

    return request(app.getHttpServer())
      .post(`/users/`)
      .send(newUser)
      .expect(400);
  });
});
