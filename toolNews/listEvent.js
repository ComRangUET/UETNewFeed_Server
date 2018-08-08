const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const scrapeEvent = require('./scrapeEvent');
const url = 'https://uet.vnu.edu.vn/category/tin-tuc/tin-sinh-vien/';

 module.exports = function scanAndUpNews() {
    request(url, (err, Response, body) => {
        let idFile = fs.readFileSync(__dirname + '/text.txt', 'utf8');
        const $ = cheerio.load(body);
        //for (let 0 = 7; 0 >= 0; 0--) {
        const classNameList1 = $('#content div.blog-listing').children().eq(0).attr('class');
        let id = '';
        for (let i = 16; i <= 20; i++) {
            id += classNameList1[i];
        }

        if (id !== idFile) {
            console.log(true);
            const srcImage = $('#content div.blog-listing').children().eq(0).children().eq(0).children().eq(0).children().eq(0).children().eq(0).children().eq(0).children().eq(0).children().eq(0).attr('src');
            const urlScrapePage = $('#content div.blog-listing ').children().eq(0).children().eq(0).children().eq(0).children().eq(0).children().eq(0).children().eq(0).children().eq(0).attr('href');
            let referrence = $('#content div.blog-listing').children().eq(0).children().eq(0).children().eq(1).children().eq(0).children().eq(0).children().eq(1).text();

            for (let i = 0; i < referrence.length; i++) {
                if (referrence.charCodeAt(i) != 160 && referrence.charCodeAt(i) != 32) {
                    referrence = referrence.substr(i, referrence.length);
                    break;
                }
            }

            scrapeEvent.postPageToDatabase(urlScrapePage, referrence, srcImage);
            fs.writeFile(__dirname + '/text.txt', id, 'utf8', (err) => {
                if (err) {
                    res.status(403).json({
                        success: false,
                        message: err.message
                    });
                }
            })
        } else {
            return;
        }
        
    });
 }