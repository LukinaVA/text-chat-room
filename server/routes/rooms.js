const Router = require('express').Router;
const createRoom = require('../controllers/rooms.js');

const router = Router();

router.get('/createRoom', createRoom);

module.exports = router;