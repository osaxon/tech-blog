const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try{
        const commentData = await Comment.findAll();
        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id)
        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create(
            {
                comment: req.body.comment,
                user_id: req.body.user_id,
                comment_id: req.body.comment_id
            },
        );
        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json({...err})
    }
})

module.exports = router;