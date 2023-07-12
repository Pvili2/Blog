const User = require('../Model/User')
const catchAsync = require("../utils/catchAsync")
const jwt = require('jsonwebtoken')
const { promisify } = require('util')


const secret = "fcdvgbhsajmkdsvgbhnjmvsdgbhnjmklp";

const register = async (req, res, next) => {
    try {
        const data = await User.create(req.body)

        res.status(202).json({ status: 'success', data });
    } catch (error) {
        return next(error);
    }
}

const login = async (req, res, next) => {

    console.log(req.body)
    const { username, password } = req.body;
    //Find if the user is exists

    const logUser = await User.findOne({ username });

    if (!logUser) return next(new Error("User not found"))
    //Check that the password is correct


    if (await logUser.comparePassword(logUser.password, password) === false) return next(new Error("Password is incorrect"))

    //Generate token
    const token = jwt.sign({ id: logUser._id }, secret, { expiresIn: '10d' });
    //Response the token to the user
    res.status(200).json({ status: 'success', token, user: { username: logUser.username, posts: logUser.posts } })
}

const provider = async (req, res, next) => {
    //Check if the user send a token
    if (!req.headers.authorization) return next(new Error("Please sign in"))
    const token = req.headers.authorization.split(' ')[1];
    //Check if the token is valid
    let verify;
    try {
        verify = await promisify(jwt.verify)(token, secret)
    } catch (error) {
        return next(new Error("Invalid token"))
    }
    //Check if the user still exists
    const user = await User.findById(verify.id).select("username posts");

    if (!user) return next(new Error("The user not exists anymore"))

    //Response 
    res.status(200).json({ status: 'success', data: user })
}


const newPost =
    module.exports = {
        register,
        login,
        provider
    }
//mongodb+srv://pvilmos2003:LpajSOHSNbNfsKih@cluster0.qoa9qcj.mongodb.net/?retryWrites=true&w=majority
//LpajSOHSNbNfsKih