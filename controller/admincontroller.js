const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const course = require('../models/coursemodels');
const faculty = require('../models/facultymodels');
const class_name = require('../models/class_namemodels');
const account = require('../models/accountmodels');
const register = require('../models/registermodels');


async function getStudents(req, res) {
    const { id_course, id_class, id_roles } = req.query;

    try {
        let listSv = [];
        await account.findAll({
            attributes: ['id', 'fullname', 'MSSV']
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
        console.log('error', err);
        return res.json({
            success: false,
            data: null,
            reason: err.message
        });
    }
}


async function getStudent(req, res) {
    try {
        await account.findOne({
            where: {
                MSSV: req.params.MSSV
            },
            include: [
                { model: course, attributes: ['course'], required: true },
                { model: faculty, attributes: ['faculty'], required: true },
                { model: class_name, attributes: ['class_name'], required: true }
            ],
            attributes: ['id', 'role_id', 'user', 'password', 'email', 'phonenumber', 'fullname', 'MSSV']
        }).then(function (result) {
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
    const { email, MSSV, id_faculty, id_class, id_course, fullname, phonenumber } = req.body;
    try {
        await account.update({
            email: email,
            MSSV: MSSV,
            id_faculty: id_faculty,
            phonenumber: phonenumber,
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

        account.destroy({
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
    const { user, MSSV, fullname, password , id_class, id_course, id_faculty} = req.body;

    try {
        if (!user || !MSSV || !fullname || !password) throw new Error('user or MSSV or fullname or password are not required');
        let salt = await bcrypt.genSalt(5);
        let hashPassword = await bcrypt.hash(password, salt);

        account.create({
            user: user,
            MSSV: MSSV,
            fullname: fullname,
            password: hashPassword,
            id_class: id_class, 
            id_course: id_course,
            id_faculty: id_faculty
        })
            .then(function () {
                res.json({
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


function configStudentJoinEvent(req, res) {
    const { MSSV, id_eve } = req.body;
    account.findOne({
        where: {
            MSSV: MSSV
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
                                account.findOne({
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
                            account.findOne({
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