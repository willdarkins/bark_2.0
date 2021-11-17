// import all models
const Park = require('./Park');
const User = require('./User');
const Vote = require('./Vote');
const Comment = require('./Comment');

// create associations

// Associating user and park through votes

User.belongsToMany(Park, {
    through: Vote,
    as: 'voted_parks',
    foreignKey: 'user_id'
});

User.hasMany(Park, {
    foreignKey: 'user_id'
});

Park.belongsToMany(User, {
    through: Vote,
    as: 'voted_parks',
    foreignKey: 'park_id'
});

// Associating vote to user by user id

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

// Associating vote to park by park id

Vote.belongsTo(Park, {
    foreignKey: 'park_id'
});

Park.hasMany(Vote, {
    foreignKey: 'park_id'
});

// Associating comment and user by user id

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

// Associating comment and park by park id

Comment.belongsTo(Park, {
    foreignKey: 'park_id'
});

Park.hasMany(Comment, {
    foreignKey: 'park_id'
});

module.exports = { User, Park, Vote, Comment }