const express = require('express');
const Post = require('../model/post');

const postsRoute = express.Router();

let posts = [
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
//The method below gives all the posts available
//To get specific post, you need to pass query parameters in the request.
//They will be starting with ?
//example: /getPosts?id=<id of the post you need> ->  /getPosts?id=q3e2

//https://www.myntra.com/gateway/v2/search/ucb?f=Categories%3ATrack%20Pants%2CTshirts%3A%3AGender%3Amen%2Cmen%20women&rf=Discount%20Range%3A40.0_100.0_40.0%20TO%20100.0%3A%3APrice%3A311.0_728.0_311.0%20TO%20728.0&rows=50&o=0&plaEnabled=false&xdEnabled=false&pincode=500084
postsRoute.get('/getPosts', (req, res) => {
    const postId = req.query.id;
    const search = req.query.search;
    

    /*START - Pagination math with example
     
    total = 10
    per page 2
    pageno = 1

    1,2

    per page 2
    pageno = 4

    we should exclude posts till page 3 and consider only 2 item from there
    2* (4 -1) -> count*(pageno-1)
    count no of posts

    END - Pagination math with example*/

    //Pagination
    const pageNo = req.query.page;
    const count = 2;

    let filter = {};
    
    if(postId) {
        filter = {
            _id: postId
        }
    }

    if(search) {
        filter = {
            title: {'$regex': `${search}`, '$options': 'i'}
        }
    }

    const postRequest = Post.find(filter);

    //Adding pagination to query
    if(!postId && pageNo && count) {
        postRequest.skip(count*(pageNo -1)).limit(count);
    }
    console.log(filter);

    postRequest.then(postData => {
        res.status(200).json({
            message: "Post fetched successfully!",
            data: postData
        });
    }).catch(err => {
        res.status(500).json({
            errorDesc: "Failed to get posts!",
            error: err
        });
    })
    
});

postsRoute.post('/createPost', (req, res) => {
    // console.log(req.body);
    // posts.push(req.body);
    
    const post  = new Post({
        user: req.body.user,
        title: req.body.title,
        content: req.body.content
    });

    post.save()
    .then((record) => {
        res.status(201).json({
            message:"Post created successfully",
            data: record
        });
    }).catch(err => {
        res.status(500).json({
            errorDesc: "Failed to create a post!",
            error: err
        })
    });
});

postsRoute.put('/updatePost/:id', (req, res) => {
    console.log(req.params.id);
    const postId = req.params.id;
    const updatedContent =  req.body;
    console.log(updatedContent);
    if(postId) {
        posts = posts.map(post => {
            if(post.id === postId) {
                return {...post, ...updatedContent};
            }
            return post;
        });
    }
    res.status(200).json({
        message: "post updated successfully",
        data: posts
    });
});

postsRoute.delete('/deletePost/:id', (req, res) => {
    const postId = req.params.id;
    let foundAt = posts.findIndex(post => post.id === postId);
    let result = posts.splice(foundAt,1);
    console.log(posts);
    res.status(200).json({
        message: "post deleted successfully",
        data: result
    })

});

module.exports = postsRoute;