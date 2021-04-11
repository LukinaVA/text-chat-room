const mongoose = require('mongoose');
const schema = mongoose.Schema;
const {userSchema} = require('../models/User')

const roomSchema = new mongoose.Schema({
    roomId: String,
    users: [userSchema]
});

const Room = mongoose.model('Room',
    roomSchema,
    'rooms');

module.exports = Room;