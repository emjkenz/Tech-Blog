const { Post } = require('../models');
const withAuth = require('../utils/auth');
const router = require('express').Router();

router.get('/', withAuth, async (req, res) => {

    const posts = await Post.findAll({
        where: {
            author_id: req.session.user.id
        },
    })

    const allPosts = posts.map(post => post.get({plain: true}))

    res.render('dashboard', { 
        ...req.session.user,
        ...{ 
            pageTitle: " | Dashboard",
            isLoggedIn: req.session.isLoggedIn,
            posts: allPosts,
        }
    })
})

router.get('/new', withAuth, (req, res) => {
    res.render('edit', {
        pageTitle: ` | New`,
        id: req.session.user.id
    })
})

router.get('/:id', withAuth, async (req, res) => {
    const postData = await Post.findByPk(req.params.id);
    const post = postData.get({plain: true});

    res.render('edit', {
        pageTitle: ` | Edit ${postData.title}`,
        post,
    })
})

module.exports = router;