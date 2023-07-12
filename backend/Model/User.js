const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const { Schema, model } = mongoose;


const userSchema = new Schema({
    username: {
        type: String,
        min: [4, "Please enter a min 4 length username"],
        unique: [true, 'This username is already taken']
    },
    password: {
        type: String,
        min: [8, 'Please enter a min 8 character length password']
    },
    posts: {
        type: Array,
    },
    postNum: {
        type: Number,
        default: 0
    }
})

userSchema.pre('save', async function (next) {

    this.password = await bcrypt.hash(this.password, 12);

    next();
})

userSchema.methods.comparePassword = async (hashedPass, pass) => {
    return await bcrypt.compare(pass, hashedPass);
}

const userModell = model('User', userSchema)

module.exports = userModell;