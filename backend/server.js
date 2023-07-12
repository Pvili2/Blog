const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect("mongodb+srv://pvilmos2003:LpajSOHSNbNfsKih@cluster0.qoa9qcj.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("DB connection established")
}).catch((err) => {
    console.log(err)
})


app.listen(4000, () => {
    console.log('Server up!')
})