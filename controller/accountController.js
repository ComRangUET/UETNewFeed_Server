const jwt = require('jsonwebtoken');

const account = require('../models/accountmodels');

async function login(req, res) {
    const user = req.body.user;
    const password = req.body.password;
    if (user == undefined || password == undefined) {
        return res.json({
            message: "Bạn không được để trống"
        });
    }

    try {
        await account.findOne({
                where: {
                    user: user,
                    password: password
                }
            })
            .then((result) => {
                const token = jwt.sign({ idaccount: result.dataValues.id }, process.env.SECRET_KEY, {
                    expiresIn: 5000000
                });
                res.json({
                    success: true,
                    data: null,
                    accessToken: token
                });
            })
            .catch(err => {
                res.json({
                    success: false,
                    data: null,
                    message: "Tài khoản hoặc mật khẩu của bạn nhập không chính xác",
                    reason: err.message
                })
            })
    } catch (err) {
        res.json({
            success: false,
            data: null,
            reason: err.message
        });
    }
}

module.exports.login = login;
