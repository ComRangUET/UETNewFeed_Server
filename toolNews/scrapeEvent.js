const request = require('request');
const cheerio = require('cheerio');
const con = require('../config');
const news = require('../models/newsmodels');

exports.postPageToDatabase = function (url, refer, img) {
    request(url, (err, res, body) => {
        if (!err) {
            let id_event;
            const $ = cheerio.load(body);
            const title = $('#content article h2').text();
            const content = '<meta name="viewport" content="initial-scale=1, maximum-scale=1">'+$('#content article div.single-post-content-text.content-pad').html();
            const sql = 'INSERT INTO news (header,introduce_news,content,image) VALUES (?,?,?,?)';
            const values = [title, refer, content, img];

            news.create({
                header: title,
                introduce: refer,
                content: content,
                image: img
            })
            .then(() => {
                console.log('push success');
            })
            .catch((err) => {
                console.log(err.message);
            })

        } else {
            res.status(403).json({
                success: false,
                message: err.message
            });
        }
    });
}