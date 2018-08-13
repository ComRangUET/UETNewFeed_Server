const Sequelize = require('sequelize');


const faculty = require('../models/facultymodels');

function getListFaculty(req, res){
    try{
        let listFaculty = [];
        faculty.findAll().then(function(result){
            result.forEach(function(i){
                listFaculty.push(i.dataValues);
            })
            return res.json({
                success: true,
                data: listFaculty
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

function putFaculty(req, res){
    const {newFaculty} = req.body;
    const {id_faculty} = req.params;
    try{
        faculty.update({
            faculty: newFaculty
        },{
            where: {
                id_faculty: id_faculty
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

function postFaculty(req, res){
    const {newFaculty} = req.body;
    try{
        faculty.create({
            faculty: newFaculty
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

function deleFaculty(req, res){
    const {id_faculty} = req.params;
    try{
        faculty.destroy({
            where: {
                id_faculty: id_faculty
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
    getListFaculty,
    postFaculty,
    putFaculty,
    deleFaculty
}