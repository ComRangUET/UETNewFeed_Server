const json2xls = require('json2xls');
const fs = require('fs');


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
                { model: courses, attributes: ['name'], required: true },
                { model: classes, attributes: ['name'], required: true }
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
                reason: err.message,
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

function putStudent(req, res) {
    const { email, phone_number, avatar } = req.body;

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
            .catch(function (err) {
                res.json({
                    success: false,
                    data: null,
                    reason: err.message,
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

function studentRegisterEvent(req, res) {
    const { id_eve } = req.body;

    try {
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
                res.json({
                    success: false,
                    data: null,
                    message: "Bạn đã theo dõi sự kiên này"
                })
            }
                
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

function getEvent(req, res) {
    try {
        register.findAll({
            where: {
                id_stu: req.tokenData.idaccounts,
                joined: 1
            },
            include: [{ model: events, attributes: ['header', 'time_start'], required: true }],
            attributes: []
        })
            .then(async function (result) {
                let listEvent = [];
                let list = [];
                await result.forEach(function (i) {
                    listEvent.push(i.dataValues);
                })
                for(let i=0;i<result.length;i++)
                {
                    list[i] = result[i].dataValues.event.dataValues;
                }
                var xls = json2xls(list);
                const file_name = Date.now() + "-" +"data.xlsx";
                const full_url = "localhost:3006/api/student/download/" + file_name;
                fs.writeFileSync("./uploads/" + file_name, xls, 'binary');
                return res.json({
                    success: true,
                    data: listEvent,
                    filename: full_url
                })
            })
    }
    catch (err) {
        return res.json({
            success: false,
            data: null,
            reason: err.message,
            message: "Có lỗi xảy ra"
        })
    }
}

function download(req, res){
    let link = './uploads/' + req.params.file_name;
    var file = fs.readFileSync('./uploads/' + req.params.file_name, 'binary');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', "attachment; filename=" + "data.xlsx")
    fs.unlink(link, function(err){
        if(err) res.json({
            success: false,
            message: "file không tồn tại"
        })
        return res.end(file, 'binary');
    })  
}

module.exports = {
    getStudent,
    putStudent,
    studentRegisterEvent,
    getEvent,
    download
} 