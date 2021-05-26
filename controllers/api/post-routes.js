const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll();
        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:id', async (req, res) => {
    console.log("Searching for post ID: ", req.params.id)
    try {
        const postData = await Post.findByPk(req.params.id)
        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;