const request = require('request');
const cheerio = require('cheerio');
const conn = require('../config');

exports.postPageToDatabase = function(url,img){
    request(url, (err, response, body) => {
        if(!err) {
            const $ = cheerio.load(body);
            const title = '<h2 class="single-content-title">'+$('#content article h2').html() + '</h2>';
            const content = '<div class="single-post-content-text content-pad">' +$('#content article div.single-post-content-text.content-pad').html() +'</div>';
            const sql = 'INSERT INTO news (header,content,image) VALUES (?,?,?)';
            const values = [title,content,img];
            conn.query(sql, values, (err, result) => {
                if(err) throw err;
                console.log('push success');
            });
        } else {
            console.log(err);
        }
    });
}

