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
                console.log(password);
                console.log(result.password);
                if (pw) {
                    await rp.roles.findOne({
                            where: { id: result.role_id }
                        })
                        .then(rows => {
                            const token = jwt.sign({ idaccount: result.dataValues.id, role: rows.dataValues.name_role }, process.env.SECRET_KEY, {
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


module.exports = {
    login
};