const account = require('../models/accountmodels');
const register = require('../models/registermodels');


function getStudent(req, res) {
    try {
        account.findOne({
            Where: {
                id: req.params.id
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
    const { major, faculty, course, email, phonenumber } = req.body;

    try {
        account.update({
            major: major,
            faculty: faculty,
            course: course,
            email: email,
            phonenumber: phonenumber
        },
            {
                where: {
                    id: req.params.id
                }
            }).then(function () {
                account.findOne({
                    where: {
                        id: req.params.id
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
    const {id_eve, id_stu} = req.body;
    try{
        let listSv = [];

        register.create({
            id_eve: id_eve,
            id_stu: id_stu
        }).then(function(){
            register.findAll({
                whrer: {
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