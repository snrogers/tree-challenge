module.exports = {
  development: {
    username: 'postgres',
    password: null,
    database: 'tree_challenge_development',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: null,
    database: 'tree_challenge_test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
    // username: process.env.PGUSER,
    // password: process.env.PGPASSWORD,
    // database: 'tree_challenge_production',
    // host: process.env.DATABASE_URL,
    // port: process.env.DATABASE_PORT,
    // dialect: 'postgres'
  }
};
