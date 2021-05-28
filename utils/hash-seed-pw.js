const { User } = require('../models');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

const hashPassword = async () => {
    await sequelize.sync({ force: true });
    const userData = await User.findAll();
    console.log(userData)
    process.exit(0)
}


hashPassword();
