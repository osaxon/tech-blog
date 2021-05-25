const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

User.init(
    // define columes

    {
        sequelize,
        freezeTableName: true,
        modelName: 'user',
    }
);

module.exports = Post;