const { Post } = require('../models');

const postData = [
    {
        title: 'test',
        post:'this is a cool post',
        date:new Date(),
        author_id:1,
    }
];

const seedUsers = () => Post.bulkCreate(postData);

module.exports = seedUsers;