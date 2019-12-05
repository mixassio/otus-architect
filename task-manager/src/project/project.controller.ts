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
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectService.getProjects();
  }

  @Post()
  async createProject(
    @Response() res: any,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    if (
      !createProjectDto ||
      !createProjectDto.key ||
      !createProjectDto.title ||
      !createProjectDto.description
    ) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Key, title and description are required!' });
    }

    let project = await this.projectService.getProjectByProjectKey(
      createProjectDto.key,
    );

    if (project) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Project exists' });
    } else {
      project = await this.projectService.createProject(createProjectDto);
    }

    return res.status(HttpStatus.OK).json(project);
  }
}
