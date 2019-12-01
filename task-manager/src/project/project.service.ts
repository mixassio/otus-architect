import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async getProjects(): Promise<Project[]> {
    return await this.projectRepository.find();
  }
  async getProjectByProjectKey(key: string): Promise<Project> {
    return (await this.projectRepository.find({ key }))[0];
  }
  async createProject(project: Project): Promise<Project> {
    console.log('hdhhdhdh=======', project);
    return this.projectRepository.save(project);
  }
}
