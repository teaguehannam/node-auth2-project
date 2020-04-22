const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

const Users = require('../users/users-model.js');
const secretFile = require('../api/secret.js');


router.post('/register', (req, res) => {
    let user = req.body;

    const rounds = process.env.HASH_ROUNDS || 16;
    const hash = bcrypt.hashSync(user.password, rounds);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json({ errorMessage: error.message});
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    console.log(username, " logging in...");

    Users.findBy({username})
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                //Give user their token
                const token = generateToken(user);
                res.status(200).json({message: 'Signed in!', token});
            } else {
                res.status(401).json({message: 'Incorrect password.'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Unable to login"});
        });
});

function generateToken(user) {
    const payload = {
        userId: user.id,
        username: user.username,
    };

    const options = {
        expiresIn:'1d'
    };

    const secret = secretFile.jwtSecret;
    return jwt.sign(payload, secret, options);
}

module.exports = router;