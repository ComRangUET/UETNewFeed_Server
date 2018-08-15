const accounts = require('../models/accountmodels');
const register = require('../models/registermodels');
const courses = require('../models/coursemodels');
const classes = require('../models/classesmodels');


function getStudent(req, res) {
    try {
        accounts.findOne({
            where: {
                id: req.tokenData.idaccount
            },
            include: [
                {model: courses, attributes: ['name'], required: true},
                {model: classes, attributes: ['name'], required: true}
            ],
            attributes: ['email', 'phone_number', 'fullname', 'mssv', 'faculty']
        }).then(function (result) {
            result.dataValues.course = result.dataValues.course.name;
            result.dataValues.class = result.dataValues.class.name;
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
    const {email, phone_number } = req.body;

    try {
        accounts.update({
            email: email,
            phone_number: phone_number
        },
            {
                where: {
                    id: req.tokenData.idaccount
                }
            }).then(function () {
                return res.json({
                    success: true,
                    data: null
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