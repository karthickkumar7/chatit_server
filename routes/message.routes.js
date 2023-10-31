const router = require('express').Router();
const messageController = require('../controllers/message.controller');

router.post('/create-message', messageController.createMessage);

router.get('/get-messages/:chatId', messageController.getMessages);

module.exports = router;
