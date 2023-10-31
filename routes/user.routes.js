const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/find-user/:id', userController.findUser);

router.get('/get-users', userController.getUsers);

module.exports = router;
