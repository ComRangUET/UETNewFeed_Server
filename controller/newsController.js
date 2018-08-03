const conn = require('../config');

function getNewsList(req, res) {
    const sql = `SELECT * FROM news ORDER BY idnews DESC LIMIT ${req.params.index}, 8`;
    try {
        conn.query(sql, (err, rows, fields) => {
            if (!err) {
                res.status(200).json(rows);
            } else {
                console.log(err);
            }
        });
    } catch (error) {
        res.status(403).json({
            success: false,
            message: err.message
        });
    }
}

function getContentNews(req, res) {
    const sql = `SELECT header, content FROM news WHERE id_news = ${req.params.id_news}`;
    try {
        conn.query(sql, function(err, rows) {
            if (!err)
                res.json({
                    success: true,
                    data: rows[0]
                })
            else {
                res.status(403).json({
                    success: false,
                    message: err.message
                });
            }
        });
    } catch (error) {
        res.status(403).json({
            success: false,
            message: err.message
        });
    }
}

module.exports.getNewsList = getNewsList;
module.exports.getContentNews = getContentNews;