const conn = require('../config');

function getNews(req,res) {
    const sql = 'SELECT * FROM news';
    conn.query(sql, (err, rows, fields) => {
        if(!err) {
            res.status(200).json(rows);
        } else {
            console.log(err);
        }
    });
}

module.exports.getNews = getNews;