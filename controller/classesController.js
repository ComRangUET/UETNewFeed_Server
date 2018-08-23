const Sequelize = require('sequelize');


const classesController = require('../models/classesmodels');

function getListClass(req, res){
    try{
        let listClass = [];
        classesController.findAll().then(function(result){
            result.forEach(function(i){
                listClass.push(i.dataValues);
            })
            return res.json({
                success: true,
                data: listClass
            })
        })
    }
    catch(err){
        return res.json({
            success: false,
            data: null,
            reason: err.message,
            message: "Có lỗi xảy ra"
        })
    }
}

function putClassName(req, res){
    const {newClass} = req.body;
    const {id_class} = req.params;
    try{
        classesController.update({
            name: newClass
        },{
            where: {
                id: id_class
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
            reason: err.message,
            message: "Có lỗi xảy ra"
        })
    }
}

function postNewClass(req, res){
    const {newClass} = req.body;
    try{
        classesController.create({
            name: newClass
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
            reason: err.message,
            message: "Có lỗi xảy ra"
        })
    }
}

function deleteClass(req, res){
    const {id_class} = req.params;
    try{
        classesController.destroy({
            where: {
                id: id_class
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
            reason: err.message,
            message: "Có lỗi xảy ra"
        })
    }
}

module.exports = {
    getListClass,
    postNewClass,
    putClassName,
    deleteClass
}