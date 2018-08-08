const express = require('express');
const Router = express.Router();
const verify = require('../../middleware/verify-token');
const accountController = require('../../controller/accountController');

Router.post('/login', accountController.login)



module.exports = Router;