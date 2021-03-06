const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try{
        const userData = await User.findAll();
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json({...err});
    }
})

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email }});

        if (!userData) {
            res.status(400).json({ message: "Incorrect email or password, please try again."})
            return;
        }
        console.log("API login route: ", req.body.password, userData.email, userData.password)

        const validPassword = await userData.checkPassword(req.body.password);

        if(!validPassword) {
            res.status(400).json({ message: "Incorrect email or password, please try again."})
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "You are now logged in"})
        })


    } catch (err) {
        res.status(400).json({...err})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password']}
        })
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json({...err});
    }
})

router.post('/new', async (req, res) => {
    try {
        const newUserData = await User.create({
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = newUserData.id;
            req.session.user_name = newUserData.user_name;
            req.session.loggedIn = true;
        });
        res.status(200).json(newUserData)

    } catch (err) {
        console.log(err)
        res.status(500).json({...err})
    }
})

module.exports = router;