const express = require('express');
const Router = express.Router();
const verify = require('../../middleware/verify-token');
const verifyPrivileges = require('../../middleware/verifyPrivileges');
const accountController = require('../../controller/accountController');
const RateLimit = require('express-rate-limit');

const loginLimiter = new RateLimit({
    windowMs: 15 * 60 * 1000,
    delayAfter: 3,
    delayMs: 1 * 1000,
    max: 5,
    message: "Bạn đã đăng nhập quá nhiều lần, hãy thử  lại sau 15 phút nữa."
})

Router.post('/login', accountController.login)
Router.put('/change_password', verify.verifyToken, accountController.changePasword);
Router.put('/reset_password/:mssv', verify.verifyToken, verifyPrivileges('reset_password'), accountController.resetPassword)

module.exports = Router;
