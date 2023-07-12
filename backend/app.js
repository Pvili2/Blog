const express = require('express');
const cors = require('cors')
const userRouter = require('./Routes/userRoutes')
const postRouter = require("./Routes/postRoutes")
const errorController = require("./Controllers/errorController")
const app = express();

//MIDDLEWARES
app.use(cors());
app.use(express.json())


app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postRouter);
app.use(errorController)
module.exports = app;