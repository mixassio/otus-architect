import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProjectHasUsers } from '../projectHasUsers/projectHasUsers.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  key: string;

  @Column({ length: 50, unique: true })
  title: string;

  @Column({ length: 255, unique: false })
  description: string;

  @Column({ length: 255, unique: false })
  taskTypes: string;

  @OneToMany(
    type => ProjectHasUsers,
    projectHasUsers => projectHasUsers.project,
  )
  public projectHasUsers!: ProjectHasUsers[];
}
