const request = require('request');
const cheerio = require('cheerio');
const mysql =require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: "qldv"
})

conn.connect

exports.postPageToDatabase = function (url, refer, img) {
    request(url, (err, res, body) => {
        if (!err) {
            let id_event;
            const $ = cheerio.load(body);
            const title = $('#content article h2').text();
            const content = '<meta name="viewport" content="initial-scale=1, maximum-scale=1">'+$('#content article div.single-post-content-text.content-pad').html();
            const sql = 'INSERT INTO news (header,introduce_news,content,image) VALUES (?,?,?,?)';
            const values = [title, refer, content, img];
            conn.query(sql, values, (err, rows) => {
                if (err) {
                    res.json({
                        success: false,
                        message: err.message
                    });
                }
                console.log('push success');
            });
        } else {
            res.status(403).json({
                success: false,
                message: err.message
            });
        }
    });
}