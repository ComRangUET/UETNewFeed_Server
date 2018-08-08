const account = require('../models/accountmodels');
const register = require('../models/registermodels');


function getStudent(req, res) {
    try {
        account.findOne({
            where: {
                id: req.tokenData.idaccount
            }
        }).then(function (result) {
            return res.json({
                success: true,
                data: result.dataValues

            })
        })
    }
    catch (err) {
        console.log('Error: ', err);
        res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}

function putStudent(req, res) {
    const {email, phonenumber } = req.body;

    try {
        account.update({
            email: email,
            phonenumber: phonenumber
        },
            {
                where: {
                    id: req.tokenData.idaccount
                }
            }).then(function () {
                account.findOne({
                    where: {
                        id: req.tokenData.idaccount
                    }
                }).then(function (result) {
                    return res.json({
                        success: true,
                        data: result.dataValues
                    })
                })
            })
    }
    catch (err) {
        console.log('Error: ', err);
        res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}

function studentRegisterEvent(req, res) {
    const {id_eve} = req.body;
    try{
        let listSv = [];

        register.create({
            id_eve: id_eve,
            id_stu: req.tokenData.idaccount
        }).then(function(){
            register.findAll({
                where: {
                    id_eve: id_eve
                }
            }).then(function(result){
                result.forEach(function(sv){
                    listSv.push(sv.dataValues);
                })
                return res.json({
                    success: true,
                    data: listSv
                })
            })
        })
    }
    catch(err){
        console.log('Error: ', err);
        res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}

module.exports = {
    getStudent, 
    putStudent,
    studentRegisterEvent
}