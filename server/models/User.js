const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    name: String,
    socketId: String
});

const User = mongoose.model('User',
    userSchema,
    'users');

module.exports = {User, userSchema};