const Router = require('express').Router;
const createRoom = require('../controllers/rooms.js');

const router = Router();

router.get('/', createRoom);

module.exports = router;