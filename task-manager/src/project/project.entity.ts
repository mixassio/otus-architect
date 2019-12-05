import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
// import { ProjectHasUsers } from '../projectHasUsers/projectHasUsers.entity';
import { User } from '../users/users.entity';

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

  @ManyToMany(
    type => User,
    user => user.projects,
  )
  @JoinTable()
  users: User[];

  // @OneToMany(
  //   type => ProjectHasUsers,
  //   projectHasUsers => projectHasUsers.project,
  // )
  // public projectHasUsers!: ProjectHasUsers[];
}
