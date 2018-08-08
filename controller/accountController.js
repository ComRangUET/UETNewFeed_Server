const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const account = require('../models/accountmodels');
const rp = require('../models/roles-privileges-model')

async function login(req, res) {
    const user = req.body.user;
    const password = req.body.password;
    if (user == undefined || password == undefined) {
        return res.json({
            success: false,
            message: "Bạn không được để trống"
        });
    }

    try {
        await account.findOne({
                where: {
                    user: user
                }
            })
            .then(async(result) => {
                const pw = await bcrypt.compare(password, result.password);
                console.log(pw);
                if (pw) {
                    await rp.roles.findOne({
                            where: { id: result.role_id }
                        })
                        .then(rows => {
                            const token = jwt.sign({ idaccount: result.dataValues.id, role_id: rows.dataValues.id }, process.env.SECRET_KEY, {
                                expiresIn: 5000000
                            });
                            res.json({
                                success: true,
                                data: null,
                                accessToken: token
                            });
                        });
                } else {
                    res.json({
                        success: false,
                        message: "tài khoản hoặc mật khẩu không đúng"
                    })
                }
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

async function changePasword(req, res, next) {
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    let salt = await bcrypt.genSalt(5);
    let hashPassword = await bcrypt.hash(newPassword, salt);
    try {
        await account.findOne({
                where: {
                    id: req.tokenData.idaccount
                }
            })
            .then(async(result) => {
                const pw = await bcrypt.compare(password, result.password);
                if (pw) {
                    await account.update({
                            password: hashPassword
                        }, {
                            where: { id: req.tokenData.idaccount }
                        })
                        .then(() => {
                            res.json({
                                success: true,
                                message: null
                            })
                        })

                } else {
                    res.json({
                        success: false,
                        message: "Tài khoản của bạn không chính xác"
                    })
                }
            })
    } catch (error) {
        res.json({
            success: false,
            result: error.message
        })
    }
}

module.exports = {
    login,
    changePasword
};