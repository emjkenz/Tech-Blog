const { Post, User } = require("../models"); 

const home = (req, res) => {
    Post.findAll({
        order: [['date', 'DESC']],
        include: {
            model: User,
        }
    })
    .then(posts => {
        const allPosts = posts.map(post => post.get({plain:true}))
        res.render('home', {posts: allPosts, pageTitle:" | Home", isLoggedIn: req.session.isLoggedIn});
    });
    
}

module.exports = home;