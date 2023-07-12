const express = require('express');
const { getAll, createPost, getUserPosts, getPostById, getPostsByUsername } = require('../Controllers/postController')
const provider = require("../Controllers/authController")
const postRouter = express.Router();

postRouter.route("/").get(getAll).post(provider, createPost)
postRouter.route("/getUserPosts").get(provider, getUserPosts)
postRouter.route("/:id").get(getPostById);
postRouter.route("/getUserPosts/:username").get(getPostsByUsername);
module.exports = postRouter;