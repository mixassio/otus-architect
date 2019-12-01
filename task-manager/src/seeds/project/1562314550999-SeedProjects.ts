import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { ProjectSeed } from './project.seed';
import { Project } from '../../project/project.entity';
import { User } from '../../users/users.entity';
import { TaskType } from '../../project/taskTypes/taskType.entity';

export class SeedProjects1562314550999 implements MigrationInterface {
  protected async prepareProjectData(project: Project): Promise<Project> {
    const userRepository = getRepository(User);
    const taskTypeRepository = getRepository(TaskType);
    const { taskTypes, projectHasUsers } = project;
    console.log('---------------00000', taskTypes, projectHasUsers);
    const registeredUsers = projectHasUsers.filter((username: string) => {
      return userRepository.find({ username })[0];
    });
    taskTypes.forEach(async (title: string) => {
      if (await taskTypeRepository.find({ title })[0]) {
        return;
      }
      const taskType = { title };
      return await taskTypeRepository.save(taskType);
    });
    project.projectHasUsers = registeredUsers;

    return project;
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    const projectRepository = getRepository(Project);

    ProjectSeed.map(async (project: Project) => {
      const projectToStore = await this.prepareProjectData(project);
      await projectRepository.save(projectToStore);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
