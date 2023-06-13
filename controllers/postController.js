const router = require('express').Router();
const { Post, User, Comment } = require('../models');
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

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findOne({
            where: {
                id: req.params.id,
            },
            include: {
                model: User,
            }
        })

        // const comments = await Comment.findAll({
        //     where: {
        //         post_id: req.params.id,
        //     }
        // });
        const p = post.get({ plain: true })
        res.render('post', { ...p, ...{ pageTitle: " | " + p.title, isLoggedIn: req.session.isLoggedIn } });
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
})

router.post('/:id/comment', async (req, res) => {
    const { postId } = req.params;
    const { id, content } = req.body;

    try {
        // Find the post by ID
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Create a new comment for the post
        const newComment = await Comment.create({
            content,
            post_id: postId, // Associate the comment with the post using the foreign key
            user_id: id,
        });

        // Respond with the created comment
        res.redirect(`/post/${postId}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;