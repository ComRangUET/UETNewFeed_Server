const con = require('../config');
const jwt = require('jsonwebtoken');

function register(req, res) {
    con.query('SELECT * FROM account WHERE user = ?', req.body.user, (err, rows) => {
        if (err) throw err;
        if (rows.length === 0) {
            con.query('INSERT INTO account(id,user,password) VALUES (?,?,?)', [req.body.id, req.body.user, req.body.password], (err, result, feilds) => {
                if (!err) {
                    console.log('success');
                    res.status(201).json({
                        success: true
                    });
                } else {
                    console.log(err);
                }
            });
        } else {
            res.json({
                message: "Your user existed"
            })
        }
    })

}

function login(req, res) {
    const user = req.body.user;
    const password = req.body.password;
    if (user == '' || password == '') {
        return res.json({
            message: "Bạn không được để trống"
        });
    }
    con.query('SELECT * FROM account WHERE user = ?', [user], (err, rows, fields) => {
        if (err) {
            res.status(400).json({
                "message": "Error Occured"
            })
            console.log(err);
        } else {
            if (rows.length > 0) {
                console.log(rows[0]);
                if (rows[0].password == password) {
                    const token = jwt.sign({ idaccount: rows[0].id, role: rows[0].role_id }, process.env.SECRET_KEY, {
                        expiresIn: 500000000
                    })
                    res.status(200).json({
                        success: true,
                        accessToken: token
                    });
                } else {
                    console.log('false');
                    res.json({
                        success: false,
                        message: 'Tài khoản hoặc mật khẩu không chính xác'
                    });
                }
            } else {
                res.json({
                    success: false,
                    message: "Tài khoản hoặc mật khâủ không chính xác"
                });
            }
        }
    })
}

module.exports.register = register;
module.exports.login = login;