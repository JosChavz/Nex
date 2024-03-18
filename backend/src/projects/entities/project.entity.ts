import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { General } from '../../../entities/general.entity';
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
