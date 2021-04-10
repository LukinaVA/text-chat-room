const app = require('./app');
const config = require('./config/config');
const Room = require('./models/Room')
const {User, userSchema} = require('./models/User')

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

io.on('connection', (socket) => {
    console.info('user connected');
    socket.on('room', async ({userName, roomId}) => {
        const room = await Room.findOne({url: roomId}).exec();
        if (room === null) {
            socket.emit('invalidRoom');
        } else {
            const tmp = await User.findOne({name: userName}).exec()
            if (tmp === null) {
                socket.join(roomId);
                const createdUser = await User.create({name: userName, socketId: socket.id});
                room.users.push(createdUser);
                await room.save();
                io.to(room.url).emit('setUsers', room.users)
            } else {
                socket.emit('alreadyTaken')
            }
        }
    });
    socket.on('message', async ({roomId, from, text}) => {
        const time = Date.now();
        const obj = {
            from,
            time,
            text
        };
        socket.broadcast.to(roomId).emit('message', obj)
    })
    socket.on('disconnect', async () => {
        console.log('bye bye')
        const user = await User.findOne({socketId: socket.id}).exec()
        if (user !== null) {
            const room = await Room.findOne({'users.name': user.name}).exec()
            let index = room.users.indexOf(room.users.find((currUser) => currUser.name === user.name));
            if (index > -1) {
                room.users.splice(index, 1);
            }
            await room.save()
            io.to(room.url).emit('setUsers', room.users)
        }
    })
});

server.listen(config.get('port'), () => {
    console.info(`Server has been started on port: ${config.get('port')}`);
});