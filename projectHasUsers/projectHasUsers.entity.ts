import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Project } from '../project/project.entity';

@Entity()
export class ProjectHasUsers {
  @PrimaryGeneratedColumn()
  public projectHasUsersId!: number;

  @Column()
  public projestId!: number;

  @Column()
  public userId!: number;

  @Column()
  public role!: string;

  @Column()
  public createdAt!: Date;

  @ManyToOne(
    type => Project,
    project => project.projectHasUsers,
  )
  public project!: Project;

  @ManyToOne(
    type => User,
    user => user.projectHasUsers,
  )
  public user!: User;
}
