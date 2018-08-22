const accounts = require('../models/accountmodels');
const register = require('../models/registermodels');
const courses = require('../models/coursemodels');
const classes = require('../models/classesmodels');
const interested = require('../models/interestedmodels');
const events = require('../models/eventmodels');



function getStudent(req, res) {
    try {
        accounts.findOne({
            where: {
                id: req.tokenData.idaccounts
            },
            include: [
                {model: courses, attributes: ['name'], required: true},
                {model: classes, attributes: ['name'], required: true}
            ],
            attributes: ['email', 'phone_number', 'full_name', 'mssv', 'faculty']
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
    const {email, phone_number, avatar } = req.body;

    try {
        accounts.update({
            email: email,
            phone_number: phone_number,
            avatar: avatar
        },
            {
                where: {
                    id: req.tokenData.idaccounts
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
        interested.findOne({
            where: {
                id_stu: req.tokenData.idaccounts,
                id_eve: id_eve
            }
        })
        .then(function(result){
            if(result==null){
                interested.create({
                    id_eve: id_eve,
                    id_stu: req.tokenData.idaccounts
                }).then(function(){
                    return res.json({
                        success: true,
                        data: null,
                        message: "Quan tâm thành công"
                    })
                })
            }
            else{
                interested.destroy({
                    where: {
                        id_eve: id_eve,
                        id_stu: req.tokenData.idaccounts
                    }
                }).then(function(){
                    res.json({
                        success: true,
                        data: null,
                        message: "Bỏ quan tâm thành công"
                    })
                })
            }
        })
    }
    catch(err){
        res.json({
            success: false
        })
    }
}

function getEvent(req, res){
    try{
        register.findAll({
            where: {
                id_stu: req.tokenData.idaccounts,
                joined: 1
            },
            include: [{model: events, attributes: ['header', 'time_start'], required: true}],
            attributes: []
        })
        .then(function(result){
            let listEvent = [];
            result.forEach(function(i){
                listEvent.push(i.dataValues);
            })
            return res.json({
                success: true,
                data: listEvent
            })
        })
    }
    catch(err){
        return res.json({
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
    getEvent
}