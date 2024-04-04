import { Column, Entity, JoinColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { General } from '../../../entities/general.entity';
import { Skill } from '../../skills/entities/skill.entity';
import { User } from '../../users/entities/user.entity';

export enum ProjectState {
  Draft = 'Draft',
  Published = 'Published',
  Archived = 'Archived',
  Deleted = 'Deleted',
}

@Entity('projects')
export class Project extends General {
  @Column({
    type: 'text',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: ProjectState,
    default: ProjectState.Draft,
  })
  state: ProjectState;

  @ManyToMany(() => Skill, (skill) => skill.id)
  @JoinTable({
    name: 'project_skills',
    joinColumn: {
      name: 'projectId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'skillId',
      referencedColumnName: 'id',
    },
  })
  skills: Skill[];

  @ManyToOne(() => User, (user) => user.projectsOwned, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'owner_id',
  })
  owner: User;

  @Column()
  owner_id: string;
}
