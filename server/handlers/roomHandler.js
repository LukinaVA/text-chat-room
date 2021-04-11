const Room = require('../models/Room')
const {User} = require('../models/User')

module.exports = (io) => {
    const onJoinRoom = async function ({roomId, userName}) {
        const socket = this;
        const room = await Room.findOne({roomId: roomId}).exec();
        if (room === null) {
            socket.emit('SERVER:INVALID_ROOM');
        } else {
            const roomUser = await Room.findOne({'roomId': roomId, 'users.name': userName}).exec();
            if (roomUser === null) {
                socket.join(roomId);
                const createdUser = await User.create({name: userName, socketId: socket.id});
                room.users.push(createdUser);
                await room.save();
                socket.emit('SERVER:ALLOW_JOIN', {roomId, userName});
                io.to(room.roomId).emit('SERVER:SET_USERS', room.users);
            } else {
                socket.emit('SERVER:USER_EXISTS');
            }
        }
    };

    return onJoinRoom
}