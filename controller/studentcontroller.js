const account = require('../models/accountmodels');
const register = require('../models/registermodels');
const course = require('../models/coursemodels');
const faculty = require('../models/facultymodels');
const class_name = require('../models/class_namemodels');


function getStudent(req, res) {
    try {
        console.log(req.tokenData.idaccount);
        account.findOne({
            where: {
                id: req.tokenData.idaccount
            },
            include: [
                {model: course, attributes: ['course'], required: true},
                {model: faculty, attributes: ['faculty'], required: true},
                {model: class_name, attributes: ['class_name'], required: true}
            ],
            attributes: ['email', 'phonenumber', 'fullname', 'MSSV']
        }).then(function (result) {
            return res.json({
                success: true,
                data: result.dataValues
            })
        })
        .catch(function(err){
            res.json({
                success: false,
                data: null,
                reason: err.message
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
                        data: null
                    })
                })
            })
            .catch(function(err){
                res.json({
                    success: false,
                    data: null,
                    reason: err.message
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

function studentRegisterEvent(req, res) {
    const {id_eve} = req.body;
    try{
        register.create({
            id_eve: id_eve,
            id_stu: req.tokenData.idaccount
        }).then(function(){
            return res.json({
                success: true,
            })
        })
    }
    catch(err){
        res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}

function studentCanleRegister(req, res){
    const {id_eve} = req.body;

    try{
        register.destroy({
            where: {
                id_eve: id_eve,
                id_stu: req.tokenData.idaccount
            }
        }).then(function(){
            res.json({
                success: true,
                data: null
            })
        })
    }
    catch(err){
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
    studentRegisterEvent,
    studentCanleRegister
}