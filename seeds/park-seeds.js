const { Park } = require('../models');

const parkdata = [
  {
    name: 'Super Awesome Park!'
  },

];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;