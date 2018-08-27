const accounts = require('../models/accountmodels');
const rp = require('request-promise');

async function putToken(req, res) {
    try {
        accounts.update({ token: req.body.token }, {
                where: { id: req.tokenData.idaccounts }
            })
            .then(() => {
                res.json({
                    success: true
                })
            })
            .catch(err => console.log(err));

    } catch (error) {
        res.json({
            success: false,
            reason: error.message,
            message: "Có lỗi xảy ra"
        })
    }
}

async function sendNotification(req, res) {
    try {
        await accounts.findAll()
            .then((result) => {

                result.forEach(i => {
                    let value = i.token;
                    rp({
                            method: 'POST',
                            uri: 'https://exp.host/--/api/v2/push/send',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: {
                                to: value,
                                title: req.body.title,
                                body: req.body.body
                            },
                            json: true
                        })
                        .then(() => {
                            res.json({
                                success: true, 
                                message: "Gửi thành công"
                            })
                        })  
                });
            })
    } catch (error) {
        res.json({
            success: false,
            reason: error.message,
            message: "Có lỗi xảy ra"
        })
    }
}

module.exports = {
    putToken,
    sendNotification
}