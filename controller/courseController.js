const Sequelize = require('sequelize');


const course = require('../models/coursemodels');

function getCourse(req, res) {
    try {
        course.findAll().then(function (result) {
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
    console.log(id_course);
    console.log(newCourse);
    try {
        course.update({
            course: newCourse
        },
            {
                where: {
                    id_course: id_course
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
        course.create({
            course: newCourse
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
        course.destroy({
            where: {
                id_course: id_course
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