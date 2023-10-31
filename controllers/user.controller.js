const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (id) => {
    return jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

const register = async (req, res) => {
    try {
        const { fname, lname, email, password } = req.body;

        // error checking
        if (!fname || !lname || !email || !password)
            return res.status(400).json({ error: 'Invalid credentials!' });

        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ error: 'User already exists!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await User.create({
            fname,
            lname,
            email,
            password: hashedPassword,
        });

        const token = createToken(createdUser._id);

        return res.status(201).json({ fname, lname, email, token });
    } catch (err) {
        return res.status(500).json({ error: 'Server error!' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res
                .status(400)
                .json({ error: 'email and password are required!' });

        const user = await User.findOne({ email });
        if (!user)
            return res
                .status(400)
                .json({ error: 'Invalid email or password!' });

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched)
            return res
                .status(400)
                .json({ error: 'Invalid email or password!' });

        const token = createToken(user._id);

        return res.status(200).json({ fname: user.fname, email, token });
    } catch (err) {
        return res.status(500).json({ error: 'Server error!' });
    }
};

const findUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({ _id: userId });
        if (!user) return res.status(404).json({ error: 'User not found' });
        return res.status(200).json({ user });
    } catch (err) {
        return res.status(500).json({ error: 'Server error!' });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        return res.status(200).json({ users });
    } catch (err) {
        return res.status(500).json({ error: 'Server error!' });
    }
};

module.exports = {
    register,
    login,
    findUser,
    getUsers,
};
