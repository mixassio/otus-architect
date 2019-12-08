import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
// import { Project } from '../project/project.entity';
// import { ProjectService } from '../project/project.service';
import { CreateUsertDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private saltRounds = 10;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) // @Inject(forwardRef(() => ProjectService))
  // private readonly projectService: ProjectService,
  {}

  // getters
  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ username });
  }

  // setters
  async createUser(newUser: CreateUsertDto): Promise<User> {
    const user = this.userRepository.create();
    // const { projects } = newUser;
    // if (projects) {
    //   const projectsData: Project[] = await Promise.all(
    //     projects.map((key: string) =>
    //       this.projectService.getProjectByProjectKey(key),
    //     ),
    //   );
    //   user.projects = projectsData.filter(Boolean);
    // }
    user.username = newUser.username;
    user.email = newUser.email;
    user.passwordHash = await this.getHash(newUser.password);

    // clear password as we don't persist passwords
    user.password = undefined;
    return this.userRepository.save(user);
  }

  // helpers
  async getHash(password: string | undefined): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compareHash(
    password: string | undefined,
    hash: string | undefined,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
