module.exports = {
  development: {
    operatorsAliases: false,
    username: 'postgres',
    password: null,
    database: 'tree_challenge_development',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    operatorsAliases: false,
    username: 'postgres',
    password: null,
    database: 'tree_challenge_test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    operatorsAliases: false,
    use_env_variable: 'DATABASE_URL'
  }
};
