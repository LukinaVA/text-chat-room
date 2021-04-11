const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    socketId: String
});

const User = mongoose.model('User',
    userSchema,
    'users');

module.exports = { User, userSchema };