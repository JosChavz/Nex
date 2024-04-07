import { User, UserRole, UserState } from '../src/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

const userCody = {
  id: uuidv4(),
  name: 'Cody',
  email: 'cody@ucsc.edu',
  password: 'cody123',
  role: UserRole.Admin,
  state: UserState.Active,
  profilePic: '',
  created_at: new Date(),
  updated_at: new Date(),
};
const userJose = {
  id: uuidv4(),
  name: 'Jose',
  password: 'password',
  email: 'jose@ucsc.edu',
  profilePic: '',
  role: UserRole.User,
  state: UserState.Active,
  created_at: new Date(),
  updated_at: new Date(),
  skills: [],
  projectsContributed: [],
  projectsOwned: [],
};

const userEric = {
  id: uuidv4(),
  name: 'Eric',
  password: 'password',
  email: 'eric@ucsc.edu',
  profilePic: '',
  role: UserRole.Moderator,
  state: UserState.Active,
  created_at: new Date(),
  updated_at: new Date(),
  skills: [],
  projectsContributed: [],
  projectsOwned: [],
};

export { userJose, userEric, userCody };
