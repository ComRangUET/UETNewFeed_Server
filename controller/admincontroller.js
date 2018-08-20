const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const courses = require('../models/coursemodels');

const classes = require('../models/classesmodels');
const accounts = require('../models/accountmodels');
const register = require('../models/registermodels');


async function getStudents(req, res) {
    const { id_course, id_class, role_id } = req.query;
    try {
        let listSv = [];
        await accounts.findAll({
            attributes: ['id', 'full_name', 'mssv', 'id_class', 'id_course', 'role_id']
        }
        ).then(function (result) {
            result.forEach(function (i) {
                listSv.push(i.dataValues);
            })
        })
        if (id_class!=undefined) {
            listSv = listSv.filter(function (sv) {
                return sv.id_class == id_class;
            })
        }
        if (id_course!=undefined) {
            listSv = listSv.filter(function (sv) {
                return sv.id_course == id_course;
            })
        }
        if (role_id!=undefined) {
            listSv = listSv.filter(function (sv) {
                return sv.role_id == role_id;
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
            attributes: ['id', 'role_id', 'user', 'password', 'email', 'phone_number', 'full_name', 'mssv', 'id_class', 'id_course', 'faculty']
        }).then(function (result) {
            result.dataValues.course = result.dataValues.course.name;
            result.dataValues.class = result.dataValues.class.name; 
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
    const { email, mssv, faculty, id_class, id_course, full_name, phone_number } = req.body;
    try {
        await accounts.update({
            email: email,
            mssv: mssv,
            faculty: faculty,
            phone_number: phone_number,
            id_class: id_class,
            id_course: id_course,
            full_name: full_name
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
    const { user, mssv, full_name, password , id_class, id_course, faculty} = req.body;

    try {
        if (!user || !mssv || !full_name || !password) throw new Error('user or mssv or full_name or password are not required');
        let salt = await bcrypt.genSalt(5);
        let hashPassword = await bcrypt.hash(password, salt);

        accounts.create({
            user: user,
            mssv: mssv,
            full_name: full_name,
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
                                    attributes: ['full_name']
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
                                attributes: ["full_name"]
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
                                        data: result.dataValues.full_name
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



function addStudentToEvent(req, res){
    const {mssv, id_eve} = req.body;
    try{
        accounts.findOne({
            where: {
                mssv: mssv
            },
            attributes: ['id']
        }).then(function(result){
            register.findOne({
                where: {
                    id_stu: result.dataValues.id,
                    id_eve: id_eve,
                }
            })
            .then(function(data){
                if(data==null){
                    register.create({
                        id_stu: result.dataValues.id,
                        id_eve: id_eve,
                        default_student: 1
                    })
                    .then(function(err){
                     return res.json({
                            success: true,
                            data: null
                        })
                    })
                }
                else if(data.dataValues.default_student==0)
                {
                    register.update({
                        default_student: 1
                    },
                    {
                        where: {
                            id_stu: result.dataValues.id,
                            id_eve: id_eve
                        }
                    })
                    .then(function(){
                        return res.json({
                            success: true,
                            data: null
                        })
                    })
                }
                else 
                    {
                        return res.json({
                            success: false,
                            data: null,
                            message: "Sinh vien da co trong danh sach"
                        })
                    }
            
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

function getImageStudent(req, res){
    const {mssv} = req.params;

    try{
        accounts.findOne({
            where: {
                mssv: mssv
            },
            attributes: ['image']
        }).then(function(result){
            return res.json({
                success: true,
                data: result.image
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
    getStudents,
    getStudent,
    putStudents,
    deleteStudents,
    postStudents,
    configStudentJoinEvent,
    addStudentToEvent,
    getImageStudent
}