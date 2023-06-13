const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.post('/', withAuth, (req, res) => {
    const {title, post, id} = req.body;
    Post.create({
        title: title,
        post: post,
        date: new Date(),
        author_id: id,
    }).then( err => {
        res.redirect('/dashboard');
    })
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        include: {
            model: User,
        }
        
    }).then(post => {
        const p = post.get({ plain: true })
        res.render('post', {...p, ...{pageTitle: " | "+p.title, isLoggedIn: req.session.isLoggedIn}});
    })
})

module.exports = router;