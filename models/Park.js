// Table of parks
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Park extends Model {
    // static function to 'like' a park. Adds to the Vote table
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            park_id: body.park_id
        }).then(() => {
            return Park.findOne({
                where: {
                    id: body.park_id
                },
                attributes: [
                    'id',
                    'name',
                    'created_at',
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM vote WHERE park.id = vote.park_id)'),
                        'vote_count'
                    ]
                ],
                include: [
                    {
                        model: models.Comment,
                        attributes: ['id', 'comment_text', 'park_id', 'user_id', 'created_at'],
                        include: {
                            model: models.User,
                            attributes: ['username']
                        }
                    }
                ]
            });
        });
    }
}
Park.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'park'
    }
);

module.exports = Park;

