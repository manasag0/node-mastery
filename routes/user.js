const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../model/user');

const userRoute = express.Router();

userRoute.post('/register', (req, res) => {
    const userData =  req.body;

    bcrypt.hash(userData.password, 10)
    .then(encryptedPassword => {
        const user = new User({
            email: userData.email,
            name: userData.name,
            password: encryptedPassword
        });
    
        user.save().then(result => {
            res.status(201).json({
                message: "User registered successfully!",
                data: result
            });
    
        }).catch(err => {
            res.status(500).json({
                errorDesc: "Something went wrong!",
                err: err
            });
        });

    }).catch(err => {
        res.status(500).json({
            errorDesc: "Internal server error"
        });
    })
 
});

userRoute.post('/login', (req, res) => {
    const loginData = req.body;

    // 2 steps
    // STEP 1: Verify if email id exists in DB
    // STEP 2: If exists, get the password and check if it matching
    // req.body has 1234, DB has 'fafhapfanglanfaflasf'
    // Given the same input, encryption will always give the same output. It is not random
    // To match the passwords, encrypt user entered password and compare it with the hash in DB.

    User.findOne({email: loginData.email}).then( user => {
        // console.log(user);
        if(user) {
            bcrypt.compare(loginData.password, user.password).then(authStatus => {
                if(authStatus) { // passwords are matching
                    console.log("passwords are matching");
                    res.status(200).json({
                        message: "Authentication successful!"
                    });
                } else {
                    res.status(403).json({
                        message: "Email or password does not match"
                    });
                }
            })
        } else {
            res.status(404).json({
                erroDesc: "Email id not registered with us!"
            });
        }

    }).catch(err => {
        res.status(500).json({
            erroDesc: "Something went wrong!",
            error: err
        });
    });
});


module.exports = userRoute;