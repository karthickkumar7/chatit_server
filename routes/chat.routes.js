const router = require('express').Router();
const chatController = require('../controllers/chat.controller');

router.post('/create-chat', chatController.createChat);

router.get('/get-chat/:userId', chatController.getUserChat);

router.get('/find/:firstId/:secondId', chatController.findChat);

module.exports = router;
