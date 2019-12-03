import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProjectHasUsers } from '../project/projectHasUsers/projectHasUsers.entity';

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

  // @OneToMany(
  //   type => ProjectHasUsers,
  //   projectHasUsers => projectHasUsers.user,
  // )
  // public projectHasUsers!: ProjectHasUsers[];
}
