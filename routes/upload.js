const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const uploadRoute =  express.Router();

uploadRoute.post('/upload', upload.single('avatar'), (req, res) => {
    // Store it on hard disk or anywhere
    // Store it with unique name
    // Store this path in mogoDB instead of storing the file directly in mongoDB
});

module.exports = uploadRoute;