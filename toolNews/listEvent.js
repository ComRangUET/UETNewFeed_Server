const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const scrapeEvent = require('./scrapeEvent');
const url = 'https://uet.vnu.edu.vn/category/tin-tong-hop/';

module.exports = function scanAndUpNews(){
        request(url, (err, Response, body) => {
            let idFile=fs.readFileSync(__dirname+'/text.txt', 'utf8');
            const $ = cheerio.load(body);
        
            const classNameList1 = $('#content div.blog-listing').children().eq(0).attr('class');
            let id = '';
            for(let i =16; i<=20; i++){
                id += classNameList1[i];
            }
            if(id !== idFile) {
                console.log(true);
                const srcImage = $('#content div.blog-listing').children().eq(0).children().eq(0).children().eq(0).children().eq(0).children().eq(0).children().eq(0).children().eq(0).children().eq(0).attr('src');
                const urlScrapePage = $('#content div.blog-listing ').children().eq(0).children().eq(0).children().eq(0).children().eq(0).children().eq(0).children().eq(0).children().eq(0).attr('href');
                scrapeEvent.postPageToDatabase(urlScrapePage,srcImage);
                fs.writeFile(__dirname+'/text.txt', id, 'utf8',(err) => {
                    if(err) {
                        console.log(err);
                    }
                })
            } 
    });
}