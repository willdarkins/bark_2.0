const seedUsers = require('./user-seeds');
const seedParks = require('./park-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');

  await seedParks();
  console.log('--------------');

  process.exit(0);
};

seedAll();