const catchAsync = require('../utils/catchAsync')
const Post = require('../Model/Post')
const Comment = require('../Model/Comment')
const sendComment = catchAsync(async (req, res) => {

    const { content } = req.body;
    const username = req.user.username;
    const comment = await Comment.create({ username, content })
    const updatedPost = await Post.findByIdAndUpdate(req.body.id, { $push: { comments: comment } })
    res.status(200).json({ data: comment })
})
module.exports = sendComment