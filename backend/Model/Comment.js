const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema({
    username: {
        type: String,
        required: [true, "Comment must have a writer"],
    },
    createdAt: {
        type: String,
    },

    content: {
        type: String,
        required: [true, 'A comment must have content']
    }
})

const commentModel = model('Comment', commentSchema);

module.exports = commentModel;