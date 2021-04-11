const {User} = require('../models/User')
const Room = require('../models/Room')

module.exports = (io) => {
    const onDisconnect = async function () {
        const socket = this;
        console.log('bye bye :)');
        const user = await User.findOne({socketId: socket.id}).exec();
        if (user !== null) {
            const room = await Room.findOne({'users.socketId': socket.id}).exec();
            let index = room.users.indexOf(room.users.find((currUser) => currUser.name === user.name));
            if (index > -1) {
                room.users.splice(index, 1);
            }
            await room.save();
            socket.leave(room.roomId);
            await User.deleteOne({'socketId': socket.id}).exec();
            io.to(room.roomId).emit('SERVER:SET_USERS', room.users);
        }
    }

    return onDisconnect
}