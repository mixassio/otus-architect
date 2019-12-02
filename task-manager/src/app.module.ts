import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 54320,
      username: 'task_manager',
      password: 'qweasd',
      name: 'db_task_manager',
      synchronize: true,
      logging: false,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    }),
    AuthModule,
    UsersModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
