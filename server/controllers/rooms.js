const generateUrl = require('../utils/util')
const Room = require('../models/Room')

async function createRoom(req, res) {
    const users = [];
    const url = generateUrl(10);
    await Room.create({
        url: url,
        users: users
    });
    // res.status(301).redirect(`http://192.168.1.43:3000/rooms/${url}`);
    res.statusCode = 200;
    res.write(url);
    res.end();
}

module.exports = createRoom;