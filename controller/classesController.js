const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const classesController = require('../models/classesmodels');
const account = require('../models/accountmodels');
const interested = require('../models/interestedmodels');
const register = require('../models/registermodels');

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

async function deleteClass(req, res){
    const {id_class} = req.params;

    const result = await account.findAll({
        where: {
            id_class: id_class
        }
    })
    let listId = [];
    result.forEach(function(i){
        listId.push(i.dataValues.id);
    })

    const data1 = await interested.destroy({
        where: {
            id_stu: {
                [Op.in]: listId
            }
        }
    })

    const data2 = await register.destroy({
        where: {
            id_stu: {
                [Op.in]: listId
            }
        }
    })

    const data3 = await account.destroy({
        where: {
            id: {
                [Op.in]: listId
            }
        }
    })

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