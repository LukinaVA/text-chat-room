const app = require('./app');
const config = require('./config/config');
const {ExpressPeerServer} = require('peer');
const server = require('http').createServer(app);

const peerServer = ExpressPeerServer(server, {
    debug: true,
});
app.use('/peerjs', peerServer);
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});

const onJoinRoom = require('./handlers/roomHandler')(io);
const onNewMessage = require('./handlers/messageHandler')(io);
const onDisconnect = require('./handlers/disconnectHandler')(io);

const onConnection = (socket) => {
    console.info('user connected');
    socket.on('JOIN__ROOM', onJoinRoom);
    socket.on('NEW_MESSAGE', onNewMessage);
    socket.on('disconnect', onDisconnect);
}

io.on('connection', onConnection);

server.listen(config.get('port'), () => {
    console.info(`Server has been started on port: ${config.get('port')}`);
});