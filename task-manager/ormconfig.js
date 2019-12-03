module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    name: 'postgres',
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['src/seeds/**/*.ts'],
};