const account = require('../models/accountmodels');
const rp = require('request-promise');

async function putToken(req, res) {
    try {
        account.update({ token: req.body.token }, {
                where: { id: req.tokenData.idaccount }
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
            reason: error.message
        })
    }
}

async function sendNotification(req, res) {
    try {
        await account.findAll()
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
            reason: error.message
        })
    }
}

module.exports = {
    putToken,
    sendNotification
}