import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
// import { ProjectHasUsers } from '../projectHasUsers/projectHasUsers.entity';
import { Project } from '../project/project.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 100, nullable: true })
  password: string | undefined;

  @Column({ length: 100, nullable: true })
  passwordHash: string | undefined;

  @Column({ length: 100, nullable: true })
  email: string;

  @ManyToMany(
    type => Project,
    project => project.users,
  )
  projects: Project[];

  // @OneToMany(
  //   type => ProjectHasUsers,
  //   projectHasUsers => projectHasUsers.user,
  // )
  // public projectHasUsers!: ProjectHasUsers[];
}
