const express = require('express');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const posts = [
    {
        id: 'q3e2',
        user: 'Tarun',
        content: '10X is awesome!'
    },
    {
        id: 'q3fskf',
        user: 'Arnab',
        content: '10X is great!'
    },
    {
        id: 'q3efs21',
        user: 'Vinati',
        content: 'I am awesome!'
    },

];

app.post('/login', (req, res) => {

});

app.use('/about', (req, res) => {
    res.send("we are 10x students");
});

//The method below gives all the posts available
//To get specific post, you need to pass query parameters in the request.
//They will be starting with ?
//example: /getPosts?id=<id of the post you need> ->  /getPosts?id=q3e2
app.get('/getPosts', (req, res) => {
    const postId = req.query.id;
    console.log(postId);

    let queriedPost = posts;  //To store any filtered post
    if(postId) {
        queriedPost = posts.filter( post => {
            if(post.id === postId) {
                return post;
            }
        });
    }

    res.status(200).json({
        message: "Post fetched successfully!",
        data: queriedPost
    });
    


    res.status(200).json(posts);
});

app.post('/createPost', (req, res) => {
    // console.log(req.body);
    posts.push(req.body);
    res.status(201).json({
        message:"post created successfully",
        data: posts
    });

});

app.put('/updatePost/:id', (req, res) => {
    console.log(req.params.id);
    const postId = req.params.id;
    const updatedContent =  req.body;
    console.log(updatedContent);
    if(postId) {
        const matchingPost = posts.find(post => {
            return post.id === postId
        });
        updatedPost = {...matchingPost,...updatedContent };
        //work on this
    }
    res.status(200).json({
        message: "post updated successfully",
        data: updatedPost
    });

});

app.delete('/deletePost/:id', (req, res) => {
    const postId = req.params.id;
    let foundAt = posts.findIndex(post => post.id === postId);
    let result = posts.splice(foundAt,1);
    console.log(posts);
    res.status(200).json({
        message: "post deleted successfully",
        data: result
    })

});

app.use('/', (req, res)=> {
    res.send("welcome to express server");
});

app.listen(3000);