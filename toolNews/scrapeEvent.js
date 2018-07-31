const request = require('request');
const cheerio = require('cheerio');
const conn = require('../config');

exports.postPageToDatabase = function(url,refer,img){
    request(url, (err, response, body) => {
        if(!err) {
            const $ = cheerio.load(body);
            const title = $('#content article h2').text();
            const content =$('#content article div.single-post-content-text.content-pad').html() ;
            const sql = 'INSERT INTO news (header,refer,image) VALUES (?,?,?)';
            const values = [title,refer,img];
            conn.query(sql, values, (err, result) => {
                if(err) throw err;
                console.log('push refer success');
            });
            conn.query('INSERT INTO news_content(header,content) VALUES(?,?)',[title, content], (err,result) => {
                if(err) throw err;
                console.log('push content success');
            })
        } else {
            console.log(err);
        }
    });
}

