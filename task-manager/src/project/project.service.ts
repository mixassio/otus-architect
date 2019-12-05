import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly usersService: UsersService,
  ) {}

  async getProjects(): Promise<Project[]> {
    return await this.projectRepository.find();
  }
  async getProjectByProjectKey(key: string): Promise<Project> {
    return (await this.projectRepository.find({ key }))[0];
  }
  async createProject(newProject: CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create();

    const { users } = newProject;
    if (users) {
      const usersData: User[] = await Promise.all(
        users.map((username: string) =>
          this.usersService.getUserByUsername(username),
        ),
      );
      project.users = usersData.filter(Boolean);
    }

    project.key = newProject.key;
    project.taskTypes = newProject.taskTypes;
    project.title = newProject.title;
    project.description = newProject.description;

    return this.projectRepository.save(project);
  }
}
