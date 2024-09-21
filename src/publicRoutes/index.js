const express = require('express');
const publicRouter = express.Router();
const { loginController } = require('../controllers/loginController');

publicRouter.post('/login', loginController);

module.exports = publicRouter;