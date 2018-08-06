const table = require('../config');



function getNewsList(req, res) {

    try {
        let listNews = [];
        table.news.findAll().then(function (result) {
            result.forEach(function (i) {
                listNews.push(i.dataValues);
            })
        }).then(function () {
            return res.json({
                success: true,
                data: listNews
            })
        })
    }
    catch (err) {
        console.log('Error', err);
        res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}

function getNews(req, res) {

    try {
        let listNews = [];
        table.news.findOne({
            where: {
                id_news: req.params.id_news
            }
        }).then(function (result) {
            return res.json({
                success: true,
                data: result.dataValues
            })
        })
    }
    catch (err) {
        console.log('Error', err);
        res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}

module.exports.getNewsList = getNewsList;
module.exports.getNews = getNews;
