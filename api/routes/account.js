const express = require('express');
const Router = express.Router();
const verify = require('../../middleware/verify-token');
const verifyPrivileges = require('../../middleware/verifyPrivileges');
const accountController = require('../../controller/accountController');
const client = require('redis').createClient();
const limiter = require('express-limiter')(Router,client)

limiter({
  path: '/login',
  method: 'post',
  lookup: 'body.user',
  total: 5,
  expire: 1000 * 60 * 1,
  onRateLimited: function (req, res, next) {
    res.status(429).json({
	success: false,
	message: "Bạn đã đăng nhập quá nhiều lần "	
      })
  }
});

Router.post('/login', loginLimiter,accountController.login)

Router.put('/change_password', verify.verifyToken, accountController.changePasword);
Router.put('/reset_password/:mssv', verify.verifyToken, verifyPrivileges('reset_password'), accountController.resetPassword)

module.exports = Router;
