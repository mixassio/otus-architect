import { Controller, Get } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectService.getProjects();
  }
}
