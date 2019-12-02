module.exports = {
  type: 'postgres',
  host: 'postgres',
  port: 54320,
  username: 'task_manager',
  password: 'qweasd',
  name: 'db_task_manager',
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/seeds/**/*.ts'],
};
