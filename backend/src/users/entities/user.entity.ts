import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { General } from '../../../entities/general.entity';
import { Skill } from '../../skills/entities/skill.entity';
import { Project } from '../../projects/entities/project.entity';

export enum UserRole {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User',
}

export const ALL_USER_ROLES: UserRole[] = [
  UserRole.Admin,
  UserRole.Moderator,
  UserRole.User,
];

export enum UserState {
  Onboarding = 'Onboarding',
  Active = 'Active',
  Inactive = 'Inactive',
}

@Entity({
  name: 'users',
})
export class User extends General {
  @Column({
    type: 'text',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  profilePic: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserState,
    default: UserState.Onboarding,
  })
  state: UserState;

  @ManyToMany(() => Skill, (skill) => skill.id)
  @JoinTable({
    name: 'user_skills',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'skillId',
      referencedColumnName: 'id',
    },
  })
  skills: Skill[];

  @OneToMany(() => Project, (project) => project.owner)
  projectsOwned: Project[];

  @ManyToMany(() => Project)
  @JoinTable({
    name: 'project_contributors',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'projectId',
      referencedColumnName: 'id',
    },
  })
  projectsContributed: Project[];
}
