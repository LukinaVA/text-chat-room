const app = require('./app');
const config = require('./config/config');

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.info('User connected')
})

server.listen(config.get('port'), () => {
    console.info(`Server has been started on port: ${config.get('port')}`);
});