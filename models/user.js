const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fname: { type: String, minLength: 4, maxLength: 20 },
    lname: { type: String, minLength: 4, maxLength: 20 },
    email: { type: String, maxLength: 30, unique: true },
    password: { type: String },
});

module.exports = mongoose.model('User', userSchema);
