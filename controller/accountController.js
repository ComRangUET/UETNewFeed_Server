const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const accounts = require('../models/accountmodels');
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
        await accounts.findOne({
            where: {
                user: user
            }
        })
            .then(async (result) => {
                const pw = await bcrypt.compare(password, result.password);
                if (pw) {
                    await rp.roles.findOne({
                        where: { id: result.role_id }
                    })
                        .then(rows => {
                            const token = jwt.sign({ idaccounts: result.dataValues.id, role_id: result.dataValues.role_id }, process.env.SECRET_KEY, {
                                expiresIn: 5000000
                            });
                            res.json({
                                success: true,
                                data: null,
                                accessToken: token,
                                mssv: `${result.dataValues.mssv}`,
                                role_id: result.dataValues.role_id
                            });
                        });
                } else {
                    res.json({
                        success: false,
                        message: "Tài khoản hoặc mật khẩu không đúng"
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
            reason: err.message,
            message: "Có lỗi xảy ra"
        });
    }
}

async function changePasword(req, res, next) {
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    if(password == null || newPassword == null){
        return res.json({
            success: false,
            message: "Bạn chưa mật khẩu cũ hoặc mật khẩu mới của bạn"
        })
    }
    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(newPassword, salt);
    try {
        await accounts.findOne({
            where: {
                id: req.tokenData.idaccounts
            }
        })
            .then(async (result) => {
                const pw = await bcrypt.compare(password, result.password);
                if (pw) {
                     accounts.update({
                        password: hashPassword
                    }, {
                            where: { id: req.tokenData.idaccounts }
                        })
                        .then(() => {
                            res.json({
                                success: true
                            })
                        })
                        .catch((err) => {
                            console.log(err);
                            res.json({
                                success: false,
				message: err.message
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
            result: error.message,
            message: "Có lỗi xảy ra"
        })
    }
}

async function resetPassword(req, res) {
    const mssv = req.params.mssv;
    if(mssv == null){
        return res.json({
            success: false,
            message: "Bạn chưa mật khẩu cũ hoặc mật khẩu mới của bạn"
        })
    }
    let salt = await bcrypt.genSalt(5);
    let hashPassword = await bcrypt.hash(mssv, salt);
    try{
        accounts.findOne({
             where: {
                mssv: mssv
            }})
            .then((result) => {
                if(result == null){
                    res.json({
                        success: false,
                        message: "Tài khoản không tồn tại"
                    })
                } else {
                    accounts.update({
                        password: hashPassword
                    }, {
                        where: { mssv: mssv}
                    })
                    .then(()=> {
                        res.json({
                            success: true
                        })
                    })
                }
            })
    } catch (err) {
        res.json({
            success: false,
            message: "Có lỗi xảy ra",
            reason: err.message
        })
    }
}
module.exports = {
    login,
    changePasword,
    resetPassword
};
