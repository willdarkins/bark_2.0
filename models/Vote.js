// Table of park upvotes or 'likes'
const { Model, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/connection');

class Vote extends Model { }

// Vote has 3 fields:
// id: the primary key
// user_id: foreign key from User model for the user 'liking' the park
// park_id: foreign key from the Park model
Vote.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        park_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'park',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'vote'
    }
);

module.exports = Vote;