const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

User.init(
    // define columes

    // id primary key
    // post
    // user
        // reference to user id
    // comments
        // reference to comments

    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        post: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        }
    },

    {
        sequelize,
        freezeTableName: true,
        modelName: 'post',
    }
);

module.exports = Post;