const router = require('express').Router();
const { 
    homeController,
    dashboardController,
    loginController,
    logoutController,
    postController,
} = require('../controllers');

router.use('/dashboard', dashboardController);
router.use('/post', postController);
router.use('/login', loginController);
router.use('/logout', logoutController);
router.use('/', homeController);

module.exports = router;