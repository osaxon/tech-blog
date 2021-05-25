const express = require('express')
const router = express.Router();
const apiRoutes = require('./api')
//TO DO import models

router.use('/api', apiRoutes);

module.exports = router;