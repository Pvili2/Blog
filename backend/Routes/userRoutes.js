const express = require('express');
const { register, login, provider } = require('../Controllers/userController')
const userRouter = express.Router();

userRouter.route('/register').post(register)
userRouter.route('/login').post(login)
userRouter.route('/provider').post(provider)
module.exports = userRouter;