const sequelize = require('../config/connection');
const { User, Park } = require('../models');

const userdata = [
    {
        username: 'willdarkins',
        email: 'will.darkins@gmail.com',
        password: 'Finley2021'
    },
    {
        username: 'megandarkins',
        email: 'morganm088@gmail.com',
        password: 'password'
    },
    {
        username: 'Finley',
        email: 'finley@gmail.com',
        password: 'password'
    },
    {
        username: 'Daisy',
        email: 'daisy@gmail.com',
        password: 'password'
    },
    {
        username: 'Boris',
        email: 'boris@gmail.com',
        password: 'password'
    },
    {
        username: 'Martha',
        email: 'martha@gmail.com',
        password: 'password'
    },
    {
        username: 'Andy',
        email: 'andy@gmail.com',
        password: 'password'
    },
    {
        username: 'Laurel',
        email: 'laurel@gmail.com',
        password: 'password'
    },
    {
        username: 'Hazel',
        email: 'hazel@gmail.com',
        password: 'password'
    },
    {
        username: 'McGraw',
        email: 'mcgraw@gmail.com',
        password: 'password'
    },
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;