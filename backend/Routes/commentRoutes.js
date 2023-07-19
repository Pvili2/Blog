const express = require('express')
const sendComment = require('../Controllers/commentController');
const provider = require('../Controllers/authController');
const commentRouter = express.Router();

commentRouter.route('/').post(provider, sendComment);


module.exports = commentRouter;