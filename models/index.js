//Collecting and exporting controller data
const User = require("./User");
const Park = require("./Park");
const Vote = require('./Vote');
const Comment = require('./Comment');

Park.hasMany(Comment, {
    foreignkey: 'park_id'
});

Comment.belongsTo(Park, {
    foreignKey: 'comment_id'
})

User.hasMany(Comment, {
    foreignKey: 'user_id'
})

module.exports = { User, Park, Vote, Comment };