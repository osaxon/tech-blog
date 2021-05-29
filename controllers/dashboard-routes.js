const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll(); // TODO: find all posts for current logged in user
        const posts = postData.map((post) => post.get({ plain: true }))
        res.render('dashboard', {posts})
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;