const router = require('express').Router();
const { homeController } = require('../controllers');

router.use('/', homeController);

module.exports = router;