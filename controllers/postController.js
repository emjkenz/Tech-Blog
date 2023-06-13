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

        const comments = await Comment.findAll({
            where: {
                post_id: req.params.id,
            },
            include: {
                model: User,
            }
        });

        const allComments = comments.map(comment => comment.get({plain:true}))

        const p = post.get({ plain: true })
        res.render('post', {
            ...p,
            ...{
                pageTitle: " | " + p.title,
                isLoggedIn: req.session.isLoggedIn,
                postID: req.params.id,
                comments: allComments,
            }
        });
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    } 
})

router.post('/:id/comment', withAuth, async (req, res) => {
    const postId = req.params.id;

    const { user, content } = req.body;
    try {
        // Find the post by ID
        const post = await Post.findByPk(postId);
        if (!post) {
            console.log("error");
            return res.status(404).json({ error: 'Post not found' });
        }

        // Create a new comment for the post
        const newComment = await Comment.create({
            content,
            post_id: postId, // Associate the comment with the post using the foreign key
            user_id: user,
        });
        // Respond with the created comment
        res.redirect(`/post/${postId}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;