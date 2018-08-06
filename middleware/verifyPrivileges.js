const con = require('../config');

function verifyPrivileges(privilege) {
    return (req, res, next) => {
        con.query(`SELECT role_id FROM account WHERE id = ${req.tokenData.idaccount}`, (err, rows) => {
            const sql = `SELECT privileges.name, privileges.alias FROM roles_privileges JOIN privileges on roles_privileges.privileges_id = privileges.id JOIN roles on roles_privileges.role_id = roles.id WHERE roles_privileges.role_id = ${rows[0].role_id} AND privileges.alias = '${req.method}' AND privileges.name = '${privilege}'`;
            con.query(sql, (err, rows) => {
                if (err) {
                    res.status(403).json({
                        success: false,
                        message: err.message
                    });
                } else if (rows.length > 0) {
                    next();
                } else {
                    res.status(403).json({
                        success: false,
                        message: "tài khoản của bạn không có quyền truy cập vào chức năng này"
                    })
                }
            });
        });
    }
}
module.exports = verifyPrivileges;