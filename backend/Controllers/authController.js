const { promisify } = require("util")
const User = require("../Model/User")
const jwt = require("jsonwebtoken")

const secret = "fcdvgbhsajmkdsvgbhnjmvsdgbhnjmklp"

const provider = async (req, res, next) => {
    if (!req.headers.authorization) return next(new Error("Please sign in"))
    const token = req.headers.authorization.split(' ')[1];
    //Check if the token is valid
    let verify;
    try {
        verify = await promisify(jwt.verify)(token, secret)
    } catch (error) {
        return next(new Error(error))
    }
    //Check if the user still exists
    const user = await User.findById(verify.id);

    if (!user) return next(new Error("The user not exists anymore"))

    req.user = user;
    next();
}


module.exports = provider;