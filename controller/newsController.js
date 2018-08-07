const sequelize = require('sequelize');


const db = require('../config').db;
const news = db.news;


function getNewsList(req, res) {
    const { index } = req.params;
    try {
        if(index < 1 )  throw new Error('index invalid');
        let listNews = [];
        news.findAll(
            {
            order: [
                ['id_news', 'DESC']
            ],
            offset: 8 * (index - 1 ),
            limit: 8,
            attributes: ['id_news', 'header', 'introduce_news', 'image']
        }).then(function (result) {
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
        news.findOne(
            {
            where: {
                id_news: req.params.id_news
            },
            attributes: ['header', 'content', 'image']
        }
        ).then(function (result) {
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

module.exports = {
    getNews,
    getNewsList
}

