require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());

// routes
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/chat', require('./routes/chat.routes'));
app.use('/api/message', require('./routes/message.routes'));

mongoose.connect(MONGO_URI).then(() => {
    app.listen(PORT, () => console.log('server started!'));
});
