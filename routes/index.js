const router = require('express').Router();
const { 
    homeController,
    dashboardController,
    loginController,
    signupController,
    logoutController,
    postController,
} = require('../controllers');

router.use('/dashboard', dashboardController);
router.use('/post', postController);
router.use('/login', loginController);
router.use('/signup', signupController);
router.use('/logout', logoutController);
router.use('/', homeController);

module.exports = router;