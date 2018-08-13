const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const course = require('../models/coursemodels');
const account = require('../models/accountmodels');
const className = require('../models/class_namemodels');

function getInforSchool(req, res){
    const {id_course} = req.query;

    try{
        if(!id_course){
            course.findAll().then(function(result){
                let listCourse = [];
                result.forEach(function(i){
                    listCourse.push(i.dataValues);
                })
                return res.json({
                    success: true,
                    data: listCourse
                })
            })
        }
        else {
            account.findAll({
                where: {
                    id_course: id_course
                },
                attributes: [
                    [Sequelize.fn('DISTINCT', Sequelize.col('id_class')), 'id_class']
                ],

            }).then(function(result){
                let listClass = [];
                result.forEach(function(i){
                    listClass.push(i.dataValues.id_class);
                });
                console.log(listClass);
                className.findAll({
                    where: {
                        id_class: {
                            [Op.in] : listClass
                        }
                    }
                }).then(function(data){
                    let list = [];
                    data.forEach(function(i){
                        list.push(i.dataValues);
                    })
                    res.json({
                        success: true,
                        data: list
                    })
                })
            })
        }
    }
    catch(err){
        return res.json({
            success: false,
            data: null,
            reason: err.meessage
        })
    }
}

module.exports = {
    getInforSchool
}

