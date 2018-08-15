const Sequelize = require('sequelize');


const courses = require('../models/coursemodels');

function getCourse(req, res) {
    try {
        courses.findAll().then(function (result) {
            let listCourse = [];
            result.forEach(function (i) {
                listCourse.push(i.dataValues);
            })
            res.json({
                success: true,
                data: listCourse
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


function putCourse(req, res) {
    const { id_course } = req.params;
    const { newCourse } = req.body;
    try {
        courses.update({
            name: newCourse
        },
            {
                where: {
                    id: id_course
                }
            })
            .then(function(result){
                res.json({
                    success: true,
                    data: null
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

function postCourse(req, res){
    const {newCourse} = req.body;
    try{
        courses.create({
            name: newCourse
        })
        .then(function(result){
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

function deleteCourse(req, res){
    const {id_course} = req.params;
    try{
        courses.destroy({
            where: {
                id: id_course
            }
        }).then(function(result){
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
    postCourse,
    putCourse,
    getCourse,
    deleteCourse
}