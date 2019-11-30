module.exports = {
    "type": "sqlite",
    database: 'database.db',
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ["src/seeds/**/*.ts"]
}