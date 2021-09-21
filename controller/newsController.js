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
            attributes: ['id', 'header', 'introduce_news', 'image']
        }).then(function (result) {
            result.forEach(function (i) {
                listNews.push(i.dataValues);
            })
        }).then(function () {
            
            news.count().then(function(data){
                let end;
                if(index*8 +8 >= data)
                    end = true
                else
                    end = false
                if(listNews == "")
                {
                    return res.json({
                        success: true,
                        data: null,
                        end: end
                    })
                }
                else{
                    return res.json({
                        success: true,
                        data: listNews,
                        end: end
                    })
                }
            })  
        })
    }
    catch (err) {
        res.json({
            success: false,
            data: null,
            reason: err.message,
            message: "Có lỗi xảy ra"
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
                data: null,
                message: "Có lỗi xảy ra"
            })
        })
    }
    catch (err) {
        res.json({
            success: false,
            data: null,
            reason: err.message,
            message: "Có lỗi xảy ra"
        })
    }
}

module.exports = {
    getNews,
    getNewsList
}

