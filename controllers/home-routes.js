const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll({
            attributes: { exclude: ['password']},
        });
        // serialise the raw data
        const posts = postData.map((post) => post.get({ plain: true}))
        res.render('homepage', {posts})
    } catch (err) {
        res.status(500).json({...err});
    }
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/signup', (req, res) => {
    res.render('sign-up')
})

module.exports = router;