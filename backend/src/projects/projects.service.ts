import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Skill } from '../skills/entities/skill.entity';
import { idArrayDto } from '../../entities/idArray.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projects: Repository<Project>,
    @InjectRepository(User)
    private users: Repository<User>,
    @InjectRepository(Skill)
    private skills: Repository<Skill>,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    userId: string,
  ): Promise<Project> {
    const existedProject: Project = await this.projects
      .createQueryBuilder('project')
      .where('project.title = :title', { title: createProjectDto.title })
      .andWhere('project.owner_id = :userId', { userId })
      .getOne();

    // Throw an error if the project already exists
    if (existedProject) {
      throw new ConflictException('Project already exists.');
    }

    const newProject: Project = await this.projects.save({
      ...createProjectDto,
      owner_id: userId,
    });

    // Not sure if this is the best way to remove the owner from the response
    delete newProject.owner;

    return newProject;
  }

  async findAll(): Promise<Project[]> {
    return this.projects.find();
  }

  async findOne(id: string): Promise<Project> {
    return this.projects.findOne({
      where: {
        id,
      },
    });
  }

  async appendSkill(projectId: string, skillIds: idArrayDto): Promise<Project> {
    const project: Project = await this.projects.findOne({
      where: {
        id: projectId,
      },
      relations: ['skills'],
    });

    if (!project) throw new NotFoundException('User is not found');

    project.skills = await this.skills.findBy({
      id: In(skillIds.ids),
    });
    await this.projects.save(project);
    return project;
  }

  async getContributors(id: string): Promise<User[]> {
    const projectContributors: User[] = await this.users
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.projectsContributed', 'project')
      .where('project.id = :id', { id })
      .getMany();

    const projectOwner: User = await this.users.findOne({
      where: {
        projectsOwned: {
          id,
        },
      },
    });

    return [projectOwner, ...projectContributors];
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
    userId: string,
    bypass: boolean = false,
  ): Promise<Project> {
    const project = await this.projects.findOne({
      where: {
        id,
      },
    });

    // Check to see if the new name exists in the database for user's projects
    const existedProject: Project = await this.projects
      .createQueryBuilder('project')
      .where('project.title = :title', { title: updateProjectDto.title })
      .andWhere('project.owner_id = :userId', { userId })
      .getOne();

    if (existedProject) {
      throw new ConflictException(
        'Project already exists, please use another name',
      );
    }

    // Checks to see if the user is the owner of the project
    if (project.owner_id !== userId && !bypass) {
      throw new ConflictException('You are not the owner of this project.');
    }

    await this.projects.update(id, updateProjectDto);

    return this.projects.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string, userId: string, bypass: boolean = false) {
    const project = await this.projects.findOne({
      where: {
        id,
      },
    });

    // Checks to see if the user is the owner of the project
    if (project.owner_id !== userId && !bypass) {
      throw new ConflictException('You are not the owner of this project.');
    }

    return this.projects.remove(project);
  }
}
