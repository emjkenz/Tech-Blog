const router = require('express').Router();
const { User } = require('../models')

router.get('/', (req, res) => {
    res.render('login', {pageTitle: " | Login"});
})

router.post('/', (req, res) => {
    const { email, password } = req.body;
    // Find the user in the database
    User.findOne({
        where: {
            email: email
        }
    })
    .then((user, err) => {

        if (err) {
            console.error('Error finding user:', err);
            res.redirect('/login'); // Redirect to login page in case of an error
            return;
        }

        if (!user || !user.isValidPassword(password)) {
            // If user doesn't exist or password is invalid
            res.render('login', { error: 'Invalid email or password.', errorType: 'is-danger' });
            return;
        }

        // User found and password is valid
        req.session.user = user; // Store the user in the session
        req.session.isLoggedIn = true;
        res.redirect('/dashboard'); // Redirect to the dashboard page
    });
})

module.exports = router;