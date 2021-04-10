const express = require('express');
const router = require('./routes/rooms.js');
const dbC = require('./middlewares/dbinit');
const logM = require('./middlewares/log');
const cors = require('cors');

const app = express();
app.use(logM);
app.use(cors());
app.use(router);

module.exports = app;