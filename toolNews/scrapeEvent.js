const request = require('request');
const cheerio = require('cheerio');
const conn = require('../config');

exports.postPageToDatabase = function(url, refer, img) {
    request(url, (err, response, body) => {
        if (!err) {
            let id_event;
            const $ = cheerio.load(body);
            const title = $('#content article h2').text();
            const content = $('#content article div.single-post-content-text.content-pad').html();
            const sql = 'INSERT INTO news (header,introduce_news,image) VALUES (?,?,?)';
            const values = [title, refer, img];
            conn.query(sql, values, (err, result) => {
                if (err) throw err;
                console.log('push refer success');
            });


            conn.query('SELECT * FROM news WHERE news.header = ?',[title],function(err, result){
                if(err) throw err;
                id_event = result[0].idnews;
                console.log(id_event);
            })
            
            conn.query('INSERT INTO news_reference(id_news) VALUES(id_event)', (err, result) => {
                if (err) throw err;
            });

            conn.query('INSERT INTO news_reference(header,content) VALUES(,?,?) WHERE news_reference.id_news = id_event', [title, content], (err, result) => {
                if (err) throw err;
                console.log('push content success');
            })
        } else {
            console.log(err);
        }
    });
}