const jwt = require('jsonwebtoken');
require('dotenv').config();

//AUTH

// After server receives the token, it needs to verify.
//Verification process -  we try to create a new token with the header+ payload + secret key
//If the token received has been compromised, or a fake one, the signature from our code and the signature 
//from the received token will not match.
// A + B + C = D    ,     A + B + X = K    ---> K === D ? no


module.exports = (req, res, next) => {
    try {
        //Authorization header will send 'Bearer token'. We are taking the second part after space
        const token = req.headers.authorization.split(' ')[1];
        const userInfo = jwt.verify(token, process.env.ENCRYPTION_SECRET);
        req.userId = userInfo.id;
        next(); // continue to process the request

    } catch(err){
        // HW - In empty error message when the token is missing after we added Bearer logic
        // HW - Check for each possible error
        res.status(401).json({
            errorDesc: "Authentication failed!",
            error: err
        })
    }
}


//client  ----------> API end point

// client------------ middleware ------------> API end point