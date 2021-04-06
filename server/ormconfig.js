module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [__dirname + '/src/entities/**/*.ts'],
  migrations: [__dirname + '/src/migration/**/*.ts'],
  subscribers: [__dirname + 'src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: __dirname + '/src/entities',
    migrationsDir: __dirname + '/src/migration',
    subscribersDir: __dirname + 'src/subscriber'
  }
}
