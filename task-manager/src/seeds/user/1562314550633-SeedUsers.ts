import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { UserSeed } from './user.seed';
import { User } from '../../users/users.entity';
import * as bcrypt from 'bcrypt';

export class SeedUsers1562314550633 implements MigrationInterface {
  protected async prepareUserData(user: User): Promise<User> {
    user.passwordHash = await bcrypt.hash(user.password, 10);
    user.password = undefined;

    return user;
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    const userRepository = getRepository(User);

    UserSeed.map(async (user: User) => {
      const userToStore = await this.prepareUserData(user);
      await userRepository.save(userToStore);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
