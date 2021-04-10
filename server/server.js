const app = require('./app');
const config = require('./config/config');
const socketio = require('socket.io');

const server = require('http').createServer(app);
const io = socketio(server);

server.listen(config.get('port'), () => {
    console.info(`Server has been started on port: ${config.get('port')}`);
});