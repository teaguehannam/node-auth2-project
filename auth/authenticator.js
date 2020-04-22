const jwt = require('jsonwebtoken');
const secretFile = require('../api/secret.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    const secret = secretFile.jwtSecret;

    if(token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if (!error) {
                req.decodedToken = decodedToken;
                next();
            } else {
                res.status(401).json({ message: 'Invalid token'})
            }
        });
    } else {
        res.status(400).json({errorMessage: 'Please provide credentials.'});
    }
};