const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try{
        const userData = await User.findAll();
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email }});

        if (!userData) {
            res.status(400).json({ message: "Incorrect email or password, please try again."})
            return;
        }

        const validPassword = await userData.checkPassword()

        
    } catch (err) {
        res.status(400).json(err)
    }
})

router.get('/:id', async (req, res) => {
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