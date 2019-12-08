import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Project } from './project.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import { CreateProjectDto } from './dto/create-project.dto';

const rpc = axios.create({
  proxy: {
    host: 'app2',
    port: 3001,
  },
});

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
  // getters
  async getProjects(): Promise<Project[]> {
    return await this.projectRepository.find({ relations: ['users'] });
  }

  async getProjectByProjectKey(key: string): Promise<Project> {
    return await this.projectRepository.findOne({ key });
  }
  // seters
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
    await rpc.post('/', project);
    return this.projectRepository.save(project);
  }
  // helpers
  async sendHookProject(project: Project): Promise<any> {
    await rpc.post('/', { data: { project } });
  }
}
