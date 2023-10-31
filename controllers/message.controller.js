const Message = require('../models/message');

const createMessage = async (req, res) => {
    const { message, chatId, senderId } = req.body;
    try {
        const createdMessage = await Message.create({
            message,
            chatId,
            senderId,
        });

        return res.status(201).json({ message: createdMessage });
    } catch (err) {
        return resizeBy.status(500).json({ error: 'Server error!' });
    }
};

const getMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        const messages = await Message.find({
            chatId,
        });

        return res.status(201).json({ messages });
    } catch (err) {
        return resizeBy.status(500).json({ error: 'Server error!' });
    }
};

module.exports = { createMessage, getMessages };
