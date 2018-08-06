const sequelize = require('sequelize');


const table = require('../config');

function getNewsList(req, res) {
    const { index } = req.params;
    try {
        let listNews = [];
        table.news.findAll({
            attributes: ['id_news', 'header', 'introduce_news', 'image']
        },
            {
            order: [
                ['id_news', 'DESC']
            ],
            offset: 3 * index,
            limit: 3
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
        table.news.findOne({
            attributes: ['header', 'content', 'image']
        },
            {
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

module.exports = {
    getNews,
    getNewsList
}

