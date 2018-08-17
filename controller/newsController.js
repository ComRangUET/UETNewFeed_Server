

const news = require('../models/newsmodels');


function getNewsList(req, res) {
    const { index } = req.query;
    try {
        let listNews = [];
        news.findAll(
            {
            order: [
                ['id', 'DESC']
            ],
            offset: 8 * index,
            limit: 8,
            attributes: ['id', 'header', 'introduce', 'image']
        }).then(function (result) {
            result.forEach(function (i) {
                listNews.push(i.dataValues);
            })
        }).then(function () {
            if(listNews == "")
            {
                return res.json({
                    success: true,
                    data: null,
                    end: true
                })
            }
            else{
                return res.json({
                    success: true,
                    data: listNews,
                    end: false
                })
            }
        })
    }
    catch (err) {
        res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}

function getNews(req, res) {
    const {id_news} = req.params;
    try {
        news.findOne(
            {
            where: {
                id: id_news
            },
            attributes: ['header', 'content', 'image']
        }
        ).then(function (result) {
            return res.json({
                success: true,
                data: result.dataValues
            })
        })
        .catch(function(err){
            res.json({
                success: false,
                data: null
            })
        })
    }
    catch (err) {
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

