import {
  Controller,
  Get,
  Post,
  Response,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectService.getProjects();
  }

  @Post()
  async createProject(@Response() res: any, @Body() body: Project) {
    if (!body || !body.key || !body.title || !body.description) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Key, title and description are required!' });
    }

    let project = await this.projectService.getProjectByProjectKey(body.key);

    if (project) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Project exists' });
    } else {
      project = await this.projectService.createProject(body);
    }

    return res.status(HttpStatus.OK).json(project);
  }
}
