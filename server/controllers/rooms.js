const Room = require('../models/Room');
const generateRoomId = require('../utils/util');

async function createRoom(req, res) {
    const users = [];
    const roomId = generateRoomId(10);
    await Room.create({
        roomId,
        users
    });
    res.statusCode = 200;
    res.write(roomId);
    res.end();
}

module.exports = createRoom;