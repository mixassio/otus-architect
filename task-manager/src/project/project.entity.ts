import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TaskType } from './taskTypes/taskType.entity';
import { ProjectHasUsers } from './projectHasUsers/projectHasUsers.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  key: string;

  @Column({ length: 50, unique: true })
  title: string;

  @Column({ length: 255, unique: true })
  description: string;

  @OneToMany(
    type => TaskType,
    taskType => taskType.project,
  )
  taskTypes: TaskType[];

  @OneToMany(
    type => ProjectHasUsers,
    projectHasUsers => projectHasUsers.project,
  )
  public projectHasUsers!: ProjectHasUsers[];
}
