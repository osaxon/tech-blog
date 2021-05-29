const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userSeedData = require('./user-seed.json');
const postSeedData = require('./post-seed.json');
const commentSeedData = require('./comment-seed.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userSeedData, {
        individualHooks: true,
    })


    for (const post of postSeedData) {
        const newPost = await Post.create({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
        
    }
    const newComment = await Comment.bulkCreate(commentSeedData)

    process.exit(0);
}

seedDatabase();