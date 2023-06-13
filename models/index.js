const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
    foreignKey: 'author_id'
});

User.hasMany(Post, {
    foreignKey: 'author_id'
})

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
})

Post.hasMany(Comment, {
    foreignKey: 'post_id',
})

Comment.belongsTo(User, {
    foreignKey: 'user_id',
})

User.hasMany(Comment, {
    foreignKey: 'user_id'
})

module.exports = { User, Post, Comment };
