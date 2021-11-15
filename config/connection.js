// Importing  base Sequelize class to create a new connection to the database
const Sequelize = require('sequelize');

//Loading enviornment variables
require('dotenv').config();

// Connection to JAWSDB database via Heroku
let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3001
  });
}

module.exports = sequelize;