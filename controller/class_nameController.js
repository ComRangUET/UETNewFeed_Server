const Sequelize = require('sequelize');


const classController = require('../models/class_namemodels');

function getListClass(req, res){
    try{
        let listClass = [];
        classController.findAll().then(function(result){
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
            reason: err.message
        })
    }
}

function putClassName(req, res){
    const {newClass} = req.body;
    const {id_class} = req.params;
    try{
        console.log(newClass);
        console.log(id_class);
        classController.update({
            class_name: newClass
        },{
            where: {
                id_class: id_class
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

function postNewClass(req, res){
    const {newClass} = req.body;
    try{
        classController.create({
            class_name: newClass
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

function deleteClass(req, res){
    const {id_class} = req.params;
    try{
        classController.destroy({
            where: {
                id_class: id_class
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
    getListClass,
    postNewClass,
    putClassName,
    deleteClass
}