//sad attempt at seeding parks from models
const { Park } = require('../models');

const parkdata = [
  {
    name: 'Super Awesome Park!'
  },

];

const seedPosts = () => Post.bulkCreate(postdata);
//export seeded parks
module.exports = seedPosts;