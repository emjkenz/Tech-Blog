const { User } = require('../models');

const userData = [
    {
        name: 'John Doe',
        password: 'password1',
        email: 'example@example.com'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;