import { UserRole } from '../users/entities/user.entity';

export interface AuthToken {
  username: string;
  id: string;
  role: UserRole;
}
