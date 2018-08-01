const express = require('express');
const Router = express.Router();
const accountController = require('../../controller/accountController');

Router.post('/register', accountController.register);

Router.post('/login', accountController.login)

module.exports = Router;