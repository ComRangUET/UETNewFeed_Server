const con = require('../config');
const rp = require('../models/roles-privileges-model');
const account = require('../models/accountmodels');

function verifyPrivileges(privilege) {
    return async(req, res, next) => {
        try {
            const role_id = req.tokenData.role_id;
            console.log(role_id)
            await rp.roles_privileges.findAll({
                where: { role_id: role_id },
                include: [{
                    model: rp.privileges,
                    where: {
                        name: privilege,
                        alias: req.method
                    }
                }]
            }).then(result => {
                let value = [];
                console.log(result);
                console.log(result)
                result.forEach(i => {
                    value.push(i.dataValues);
                })
                if (value[0] === undefined) {
                    res.json({
                        success: false,
                        message: "Tài khoản của bạn không có quyền truy cập vào chức năng này"
                    });
                } else {
                    next();
                }
            })


        } catch (err) {
            res.json({
                success: false,
                message: err.message
            });
        }
    }
}
module.exports = verifyPrivileges;