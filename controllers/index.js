const router = require('express').Router();
//TO DO import models

router.get('/', async (req, res) => {
    res.render('homepage')
})

module.exports = router;