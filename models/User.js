const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
const { beforeCreate } = require('./Post');

class User extends Model {}

User.init(
    // define columes
    // id PK
    // username
    // email
    // password

    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            },
        }

    },

    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.email = await newUserData.email.toLowerCase();
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUser
            },
        }
    },

    {
        sequelize,
        freezeTableName: true,
        modelName: 'user',
    }
);

module.exports = User;