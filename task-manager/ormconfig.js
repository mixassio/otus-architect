module.exports = {
    type: 'mysql',
    host: 'mysql',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['src/seeds/**/*.ts'],
};