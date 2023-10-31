const Chat = require('../models/chat');

const createChat = async (req, res) => {
    const { firstId, secondId } = req.body;
    try {
        const chat = await Chat.findOne({
            members: { $all: [firstId, secondId] },
        });

        if (chat) {
            return res.status(200).json({ chat });
        }

        const createdChat = await Chat.create({
            members: [firstId, secondId],
        });

        return res.status(201).json({ chat: createdChat });
    } catch (err) {
        return res.status(500).json({ error: 'Server error!' });
    }
};

const getUserChat = async (req, res) => {
    const { userId } = req.params;
    try {
        const chats = await Chat.find({
            members: { $in: [userId] },
        });

        return res.status(200).json({ chats });
    } catch (err) {
        return res.status(500).json({ error: 'Server error!' });
    }
};

const findChat = async (req, res) => {
    const { firstId, secondId } = req.params;
    try {
        const chat = await Chat.findOne({
            members: { $all: [firstId, secondId] },
        });

        return res.status(200).json({ chat });
    } catch (err) {
        return res.status(500).json({ error: 'Server error!' });
    }
};

module.exports = {
    createChat,
    getUserChat,
    findChat,
};
