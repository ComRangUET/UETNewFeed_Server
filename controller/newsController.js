const conn = require('../config');



function getNewsList(req, res) {
    const sql = 'SELECT * FROM news';
    try {
        conn.query(sql, (err, rows, fields) => {
            if (!err) {
                res.status(200).json(rows);
            } else {
                console.log(err);
            }
        });
    } catch (error) {
        throw error;
    }
}

function getNew(req, res){
    const sql = `SELECT id_news, news_reference.header, content, introduce_news, image  FROM news_reference inner join news on news_reference.id_news = news.idnews WHERE news_reference.id_news= ${req.params.id_news}`;
    try{
        conn.query(sql, function(err, result){
            if(!err)   
                res.json({
                    success: true,
                    data: result
                })
            else throw err;
        });
    }
    catch(error)
    {
        throw error;
    }
}

module.exports.getNewsList = getNewsList;
module.exports.getNew = getNew;
