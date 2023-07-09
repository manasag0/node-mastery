const express = require('express');
const bodyParser = require('body-parser');
const postsRoute = require('./routes/post');

const app = express();

app.use(bodyParser.json());

app.use('/post', postsRoute);


app.post('/login', (req, res) => {

});

app.use('/about', (req, res) => {
    res.send("we are 10x students");
});

app.use('/', (req, res)=> {
    res.send("welcome to express server");
});

app.listen(3000);