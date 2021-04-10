const mongoose = require('mongoose');
const schema = mongoose.Schema;
const {userSchema} = require('../models/User')

const roomSchema = new schema({
    url: String,
    users: [userSchema]
});

const Room = mongoose.model('Room',
    roomSchema,
    'rooms');

module.exports = Room;