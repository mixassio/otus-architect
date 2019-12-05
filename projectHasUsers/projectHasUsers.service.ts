import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectHasUsers } from './projectHasUsers.entity';
import { Project } from '../project/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectHasUsers)
    private readonly projectHasUsersRepository: Repository<ProjectHasUsers>,
  ) {}

  async addUsersToProject(project: Project): Promise<ProjectHasUsers> {}

  async addProjectsToUser(): Promise<ProjectHasUsers> {}

  async getProjects(): Promise<Project[]> {
    return await this.projectHasUsersRepository.find();
  }
  async getProjectByProjectKey(key: string): Promise<Project> {
    return (await this.projectHasUsersRepository.find({ key }))[0];
  }
  async createProject(project: Project): Promise<Project> {
    return this.projectHasUsersRepository.save(project);
  }
}
