import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { User } from './users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
<<<<<<< HEAD
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [User],
=======
      type: 'postgres',
      host: 'postgres',
      port: 54320,
      username: 'task_manager',
      password: 'qweasd',
      name: 'db_task_manager',
>>>>>>> 8cf7dd5ee4b4171171cc25692bd6df00058b08b4
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
