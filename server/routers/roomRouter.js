const { Router } = require('express');
const { createRoom } = require('../controllers/room');
const auth = require('../middleware/auth');

const roomRouter = Router();

roomRouter.post('/', auth,  createRoom);

module.exports = roomRouter;
