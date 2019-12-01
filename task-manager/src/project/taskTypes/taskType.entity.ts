import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Project } from '../project.entity';

@Entity()
export class TaskType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  title: string;

  @ManyToOne(
    type => Project,
    project => project.taskTypes,
  )
  project: Project;
}
