const generateUrl = require('../utils/util');
const Room = require('../models/Room');

async function createRoom(req, res) {
    const users = [];
    const url = generateUrl(10);
    await Room.create({
        roomId: url,
        users: users
    });
    res.statusCode = 200;
    res.write(url);
    res.end();
}

module.exports = createRoom;