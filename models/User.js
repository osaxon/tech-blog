const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
    // define columes

    {
        sequelize,
        freezeTableName: true,
        modelName: 'user',
    }
);

module.exports = User;