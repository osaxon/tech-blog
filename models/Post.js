const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
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

        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        post: {
            type: DataTypes.STRING(500),
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
        sequelize: sequelize,
        freezeTableName: true,
        modelName: 'post',
    }
);

module.exports = Post;