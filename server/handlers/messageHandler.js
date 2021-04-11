module.exports = (io) => {
    const onNewMessage = async function ({roomId, userName, text}) {
        const socket = this;
        const time = Date.now();
        const message = {
            from: userName,
            time,
            text
        };
        socket.broadcast.to(roomId).emit('SERVER:ADD_MESSAGE', message);
    }

    return onNewMessage
}