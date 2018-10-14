'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// importing models
// assigning these as part of database object
db.Books = require('./books.js')(sequelize, Sequelize);
db.Loans = require('./loans.js')(sequelize, Sequelize);
db.Patrons = require('./patrons.js')(sequelize, Sequelize);

// model associatons - table joins
db.Books.hasOne(db.Loans);
db.Loans.belongsTo(db.Books);
db.Loans.belongsTo(db.Patrons);
db.Patrons.hasMany(db.Loans);

module.exports = db;
