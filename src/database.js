const mongoose = require("mongoose");

require('dotenv').config();

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
})
    .then(db => console.log('Database is Connected'))
    .catch(err => console.log(err))