import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectState } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projects: Repository<Project>,
    @InjectRepository(User)
    private users: Repository<User>,
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
