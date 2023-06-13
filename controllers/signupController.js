const router = require('express').Router();
const { User } = require('../models')

router.get('/', (req, res) => {
    res.render('login-signup',{
        pageTitle: " | Signup",
        signupPage: 'is-active',
        page: '/signup',
        title: 'Signup',
    })
});

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email:email } });
        console.log("check");
        if (existingUser) {
            console.log("existing");
            return res.render('login-signup', { 
                error: 'Email already exists',
                errorType: 'is-danger',
                pageTitle: " | Signup",
                signupPage: 'is-active',
                page: '/signup',
                title: 'Signup',
            });
        }

        const user = await User.create({
            name: name,
            email: email,
            password: password,
        });
        console.log("created");
        req.session.user = user; // Store the user in the session
        req.session.isLoggedIn = true;
        res.redirect('/dashboard');
    } catch (error) {
        console.log("error");
        return res.render('login-signup', {
            error: 'Error',
            errorType: 'is-danger',
            pageTitle: " | Signup",
            signupPage: 'is-active',
            page: '/signup',
            title: 'Signup',
        });}
})

module.exports = router;