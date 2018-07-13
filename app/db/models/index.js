// TODO: Maybe go back to require()
// Gotta use const because Sequlize does some kinda module loading
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const configs = require('../../db/config/config');

// TODO: Maybe go back to require()
// Because I'm transpiling, __dirname points to build/server
const basename = path.resolve(__dirname, '..', '..', 'db', 'models');
const env = process.env.NODE_ENV || 'development';
const config = configs[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(basename)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file !== 'index.js'
    );
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(basename, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
