const Post = require('../Model/Post')
const User = require('../Model/User')
const catchAsync = require("../utils/catchAsync")

const getAll = async (req, res) => {
    const posts = await Post.find().sort({ publishedTime: "desc" });

    res.status(200).json({
        status: "success",
        count: posts.length,
        data: posts
    })
}

const createPost = catchAsync(async (req, res) => {

    const newPost = await Post.create({
        title: req.body.title,
        content: req.body.content,
        writer: req.user.username,
        summary: req.body.summary
    });

    await User.findByIdAndUpdate({ _id: req.user.id }, { $push: { posts: newPost }, $inc: { postNum: 1 } })
    res.status(201).json({
        status: "success",
        data: newPost
    })
})

const getUserPosts = catchAsync(async (req, res, next) => {
    const posts = await User.findById(req.user.id).sort({ publishedTime: "desc" });

    res.status(200).json({ status: "success", data: posts.posts })
})

const getPostById = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.id).sort({ publishedTime: "desc" });

    res.status(200).json({ status: "success", data: post })
})

const getPostsByUsername = catchAsync(async (req, res, next) => {

    const post = await User.findOne({ username: req.params.username }).sort({ publishedTime: "desc" })
    res.status(200).json({ status: "success", data: post.posts })

})

module.exports = {
    getAll,
    createPost,
    getUserPosts,
    getPostById,
    getPostsByUsername
}