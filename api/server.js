// Server Setup
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
// Get Routers
const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/auth-router.js');
const authenticator = require('../auth/authenticator.js');
// Apply Middleware
const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());
// Authentication needed to access users
server.use('/api/users', authenticator, usersRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
    res.json({ message: 'Server is active'});
});

module.exports = server;