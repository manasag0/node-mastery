const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const uploadRoute =  express.Router();

uploadRoute.post('/upload', upload.single('pic'), (req, res) => {
    // Store it on hard disk or anywhere
    // Store it with unique name
    // Store this path in mongoDB instead of storing the file directly in mongoDB
    console.log(req.file);
    res.status(201).json({
        message: "File uploaded successfully!"
    });
});

module.exports = uploadRoute;