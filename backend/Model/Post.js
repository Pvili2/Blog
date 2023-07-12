const mongoose = require('mongoose');
const slugify = require('slugify');
const { Schema, model } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        min: [8, "The title must be at least 8 character long"],
        required: [true, "The articlemust have a title"]
    },
    content: {
        type: String,
        min: [16, "The article must be at least 16 character long"],
        required: [true, "The article must have content"]
    },
    imageCover: String,
    publishedTime: {
        type: Date,
    },
    writer: {
        type: String,
        required: [true, "The article must have a writer"]
    },
    urlTitle: {
        type: String,

    },
    summary: {
        type: String,
        required: [true, "The article must have a summary"]
    }

})

postSchema.pre("save", function (next) {
    this.urlTitle = slugify(this.title, { lower: true })
    this.publishedTime = new Date(Date.now()).toLocaleDateString() + " " + new Date(Date.now()).toLocaleTimeString();
    next();
})

const userModel = model("Post", postSchema)

module.exports = userModel;