const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try{
        const userData = await User.findAll();
        const users = userData.map((user) => user.get({ plain: true}))
        res.render('homepage', {users})
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:id', async (req, res) => {
    console.log("Searching for user ID: ", req.params.id)
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password']}
        })
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;