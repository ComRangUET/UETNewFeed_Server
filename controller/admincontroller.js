const account = require('../models/accountmodels');
const register = require('../models/registermodels');
const bcrypt = require('bcrypt');

async function getStudents(req, res) {
    const { major, course, role_id } = req.query;

    try {
        let listSv = [];
        await account.findAll().then(function (result) {
            result.forEach(function (i) {
                listSv.push(i.dataValues);
            })
        })
        if (course) {
            listSv = listSv.filter(function (sv) {
                return sv.course == course;
            })
        }
        if (major) {
            listSv = listSv.filter(function (sv) {
                return sv.major == major;
            })
        }
        if (role_id) {
            listSv = listSv.filter(function (sv) {
                return sv.role_id == role_id;
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
    const { id, MSSV } = req.query;

    try {
        let listSv = [];
        await account.findAll().then(function (result) {
            result.forEach(function (i) {
                listSv.push(i.dataValues);
            })
        });

        if (id) {
            listSv = listSv.filter(function (sv) {
                return sv.id == id;
            })
        }

        if (MSSV) {
            listSv = listSv.filter(function (sv) {
                return sv.MSSV == MSSV;
            })
        }

        res.json({
            success: true,
            data: listSv
        })
    } catch (err) {
        console.log('error', err);
        res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}

async function putStudents(req, res) {
    const { email, major, faculty, course, phonenumber } = req.body;

    try {
        await account.update({
            email: email,
            major: major,
            faculty: faculty,
            phonenumber: phonenumber,
            course: course
        }, {
                where: {
                    id: req.params.id
                }
            })
            .then(async function () {
                await table.account.findOne({
                    where: {
                        id: req.params.id
                    }
                })
                    .then(function (result) {
                        return res.json({
                            success: true,
                            data: result.dataValues
                        })
                    })
            })
    } catch (err) {
        console.log('error', err);
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
                let listSv = [];
                table.account.findAll().then(function (result) {
                    result.forEach(function (i) {
                        listSv.push(i.dataValues);
                    })
                })
                    .then(function () {
                        return res.json({
                            success: true,
                            data: listSv
                        })
                    })
            })

    } catch (err) {
        console.log('error', err);
        return res.json({
            success: false,
            data: null,
            reason: err.message
        });
    }
}


async function postStudents(req, res) {
    const { role_id, user, MSSV, fullname, password } = req.body;

    try {
        if (!role_id || !user || !MSSV || !fullname || !password) throw new Error('role_id, user, MSSV are not required');
        let salt = await bcrypt.genSalt(5);
        let hashPassword = await bcrypt.hash(password, salt);

        account.create({
            role_id: role_id,
            user: user,
            MSSV: MSSV,
            fullname: fullname,
            password: hashPassword
        })
            .then(function () {
                res.json({
                    success: true,
                    data: null
                })
            })

    } catch (err) {
        console.log('error', err);
        res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}

function configStudentJoinEvent(req, res) {
    const { id_stu, id_eve } = req.body;

    register.findOne({
        where: {
            id_eve: id_eve,
            id_stu: id_stu
        }
    })
    .then(function (result) {
        if (result === null){
            register.create({
                id_stu: id_stu,
                id_eve: id_eve,
                joined: 1
            })
            .then(function(){
                res.json({
                    success: true,
                    data: null
                })
            })
            .catch(function(err){
                console.log(err);
                res.json({
                    success: false,
                    data: null,
                    reason: "MSSV not invalid"
                })
            })
        }
        else{
            if(result.dataValues.joined == 1){
                res.json({
                    success: false,
                    data: null,
                    reason: "Masv da duoc diem danh"
                })
            }
            else{
                register.update({
                    joined: 1
                },{
                    where:{
                        id_eve: id_eve,
                        id_stu: id_stu
                    }
                })
                .then(function(){
                    res.json({
                        success: true,
                        data: null
                    })
                })
            }
        }
        
    })
    .catch(err => {
        console.log(err);
        res.json({
            success: false,
            data: null,
            reason: err.message
        })
    })
}





module.exports = {
    getStudents,
    getStudent,
    putStudents,
    deleteStudents,
    postStudents,
    configStudentJoinEvent
}