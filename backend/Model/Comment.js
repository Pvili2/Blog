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

commentSchema.pre('save', function () {
    this.createdAt = Date.now();
})

const commentModel = model('Comment', commentSchema);

module.exports = commentModel;