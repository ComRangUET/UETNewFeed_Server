const conn = require('../config');



function getNewsList(req, res) {
    const sql = 'SELECT * FROM news';
    try {
        console.log(req.hasPrivilege);
        if (req.hasPrivilege) {
            conn.query(sql, (err, rows, fields) => {
                if (!err) {
                    res.status(200).json(rows);
                } else {
                    console.log(err);
                }
            });
        } else {
            res.json({
                success: false,
                message: "Tài khoản của bạn không có quyền dùng chức năng này"
            })
        }

    } catch (error) {
        throw error;
    }
}

module.exports.getNewsList = getNewsList;