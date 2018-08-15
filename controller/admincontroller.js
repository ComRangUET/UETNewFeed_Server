const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const courses = require('../models/coursemodels');

const classes = require('../models/classesmodels');
const accounts = require('../models/accountmodels');
const register = require('../models/registermodels');


async function getStudents(req, res) {
    const { id_course, id_class, id_roles } = req.query;

    try {
        let listSv = [];
        await accounts.findAll({
            attributes: ['id', 'fullname', 'mssv']
        }
        ).then(function (result) {
            result.forEach(function (i) {
                listSv.push(i.dataValues);
            })
        })
        if (id_class) {
            listSv = listSv.filter(function (sv) {
                return sv.id_class == id_class;
            })
        }
        if (id_course) {
            listSv = listSv.filter(function (sv) {
                return sv.id_course == id_course;
            })
        }
        if (id_roles) {
            listSv = listSv.filter(function (sv) {
                return sv.id_roles == id_roles;
            })
        }
        res.json({
            success: true,
            data: listSv
        });
    } catch (err) {
        return res.json({
            success: false,
            data: null,
            reason: err.message
        });
    }
}


async function getStudent(req, res) {
    try {
        await accounts.findOne({
            where: {
                mssv: req.params.mssv
            },
            include: [
                { model: courses, attributes: ['name'], required: true },
                { model: classes, attributes: ['name'], required: true }
            ],
            attributes: ['id', 'role_id', 'user', 'password', 'email', 'phone_number', 'fullname', 'mssv']
        }).then(function (result) {
            result.dataValues.course = result.dataValues.course.name;
            result.dataValues.class = result.dataValues.class.name; 
            console.log(result.dataValues.course.name);
            res.json({
                success: true,
                data: result.dataValues
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


async function putStudents(req, res) {
    const { email, mssv, faculty, id_class, id_course, fullname, phone_number } = req.body;
    try {
        await accounts.update({
            email: email,
            mssv: mssv,
            faculty: faculty,
            phone_number: phone_number,
            id_class: id_class,
            id_course: id_course,
            fullname: fullname
        }, {
                where: {
                    id: req.params.id
                }
            })
            .then(function () {
                return res.json({
                    success: true,
                    data: null
                })
            })
    } catch (err) {
        res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}


function deleteStudents(req, res) {
    try {
        register.destroy({
            where: {
                id: req.params.id
            }
        });

        accounts.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function () {
                return res.json({
                    success: true,
                    data: null
                })
            })
    } catch (err) {
        return res.json({
            success: false,
            data: null,
            reason: err.message
        });
    }
}


async function postStudents(req, res) {
    const { user, mssv, fullname, password , id_class, id_course, faculty} = req.body;

    try {
        if (!user || !mssv || !fullname || !password) throw new Error('user or mssv or fullname or password are not required');
        let salt = await bcrypt.genSalt(5);
        let hashPassword = await bcrypt.hash(password, salt);

        accounts.create({
            user: user,
            mssv: mssv,
            fullname: fullname,
            password: hashPassword,
            id_class: id_class, 
            id_course: id_course,
            faculty: faculty
        })
            .then(function () {
                res.json({
                    success: true,
                    data: null
                })
            })
            .catch(function(err){
                return res.json({
                    success: false,
                    data: null,
                    message: err.message
                })
            })

    } catch (err) {
        res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}


function configStudentJoinEvent(req, res) {
    const { mssv, id_eve } = req.body;
    accounts.findOne({
        where: {
            mssv: mssv
        }
    })
        .then(function (student) {
            const id_stu = student.dataValues.id;
            register.findOne({
                where: {
                    id_eve: id_eve,
                    id_stu: id_stu
                }
            })
                .then(function (result) {
                    if (result === null) {
                        register.create({
                            id_stu: id_stu,
                            id_eve: id_eve,
                            joined: 1
                        })
                            .then(function () {
                                accounts.findOne({
                                    where: {
                                        id: id_stu
                                    },
                                    attributes: ['fullname']
                                })
                                    .then(function (data) {
                                        res.json({
                                            success: true,
                                            data: data.dataValues
                                        })
                                    })

                            })
                    } else {
                        if (result.dataValues.joined == 1) {
                            accounts.findOne({
                                where: {
                                    id: id_stu
                                },
                                attributes: ["fullname"]
                            })
                                .then(function (data) {
                                    res.json({
                                        success: true,
                                        data: data.dataValues,
                                        reason: "Masv da duoc diem danh"
                                    })
                                })

                        } else {
                            register.update({
                                joined: 1
                            }, {
                                    where: {
                                        id_eve: id_eve,
                                        id_stu: id_stu
                                    }
                                })
                                .then(function () {
                                    res.json({
                                        success: true,
                                        data: result.dataValues.fullname
                                    })
                                })
                        }
                    }

                })
                .catch(err => {
                    res.json({
                        success: false,
                        data: null,
                        reason: err.message
                    })
                })
        })
        .catch(function (err) {
            res.json({
                success: false,
                data: null,
                reason: "MSSV invalid"
            })
        })
}



/* function addStudentToEvent(req, res){
    
    const {listSv, id_eve} = req.query;
    let listId = [];
    console.log(listSv);
    console.log(id_eve);
    account.findAll({
        where: {   
            MSSV: {[Op.in]:listSv}
        },
        attributes: ['id']
    })
    .then(function(result){
        result.forEach(function(i){
            listId.push(i.dataValues)
        })
        console.log(listId)
        register.create({
            id_eve: id_eve,
            id_stu: {[Op.in]:listId}
        })
        .then(function(data){
            return res.json({
                success: true,
                message: "Thêm thành công"
            })
        })
        .catch(function(err){
            return res.json({
                success: false,
                data: null,
                reason: err.message
            })
        })
    })
    .catch(function(err){
        return res.json({
            success: false,
            data: null,
            reason: err.message
        })
    })

    
} */

module.exports = {
    getStudents,
    getStudent,
    putStudents,
    deleteStudents,
    postStudents,
    configStudentJoinEvent,
    //addStudentToEvent
}