const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.connect(config.get('db:mongo:url'), {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
    console.info(`Connected to mongo on: ${config.get('db:mongo:url')}`);
});

mongoose.connection.on('error', (err) => {
    console.error('Could not connect to mongodb: ', err);
    process.exit(2);
});

module.exports = mongoose.connection;