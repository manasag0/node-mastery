const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const postsRoute = require('./routes/post');
const userRoute = require('./routes/user');
const uploadRoute = require('./routes/upload');

const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

// connection to mongoDB
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then((response) => {
    console.log("Connected to mongo DB successfully!");
})
.catch( err => {
    console.log("Connection to DB failed!", err);
});

app.use('/post', postsRoute);

app.use('/user', userRoute);

app.use('/photos', uploadRoute);

app.use('/about', (req, res) => {
    res.send("we are 10x students");
});

app.use('/', (req, res)=> {
    res.send("welcome to express server");
});

app.listen(process.env.PORT || 3000);

module.exports = app;