const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userSeedData = require('./user-seed.json');
const postSeedData = require('./post-seed.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userSeedData)

    for (const post of postSeedData) {
        const newPost = await Post.create({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
}

seedDatabase();