const conn = require('../config');

function getRole(id) {
    if (id !== 1) return 'student';
    else return 'admin';
}

function getNewsList(req, res) {
    const sql = 'SELECT * FROM news';
    try {

        conn.query(sql, (err, rows, fields) => {
            if (!err) {
                res.status(200).json(rows);
            } else {
                console.log(err);
            }
        });

    } catch (error) {
        throw error;
    }
}

module.exports.getNewsList = getNewsList;