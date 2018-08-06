const request = require('request');
const cheerio = require('cheerio');
const conn = require('../config');

exports.postPageToDatabase = function (url, refer, img) {
    request(url, (err, response, body) => {
        if (!err) {
            let id_event;
            const $ = cheerio.load(body);
            const title = $('#content article h2').text();
            const content = $('#content article div.single-post-content-text.content-pad').html();
            const sql = 'INSERT INTO news (header,introduce_news,content,image) VALUES (?,?,?,?)';
            const values = [title, refer, content, img];
            conn.query(sql, values, (err, rows) => {
                if (err) {
                    res.status(403).json({
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