const account = require('../models/accountmodels');
const register = require('../models/registermodels');
const bcrypt = require('bcrypt');
const rp = require('../models/roles-privileges-model');

async function getStudents(req, res) {
    const { major, course, role_id } = req.query;

    try {
        let listSv = [];
        await account.findAll().then(function(result) {
            result.forEach(function(i) {
                listSv.push(i.dataValues);
            })
        })
        if (course) {
            listSv = listSv.filter(function(sv) {
                return sv.course == course;
            })
        }
        if (major) {
            listSv = listSv.filter(function(sv) {
                return sv.major == major;
            })
        }
        if (role_id) {
            listSv = listSv.filter(function(sv) {
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
        await account.findAll().then(function(result) {
            result.forEach(function(i) {
                listSv.push(i.dataValues);
            })
        });

        if (id) {
            listSv = listSv.filter(function(sv) {
                return sv.id == id;
            })
        }

        if (MSSV) {
            listSv = listSv.filter(function(sv) {
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
            .then(async function() {
                await table.account.findOne({
                        where: {
                            id: req.params.id
                        }
                    })
                    .then(function(result) {
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
            .then(function() {
                let listSv = [];
                table.account.findAll().then(function(result) {
                        result.forEach(function(i) {
                            listSv.push(i.dataValues);
                        })
                    })
                    .then(function() {
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
            .then(function() {
                let listSv = [];
                account.findAll().then(function(result) {
                        result.forEach(function(i) {
                            listSv.push(i.dataValues);
                        })
                    })
                    .then(function() {
                        res.json({
                            success: true,
                            data: listSv
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

async function getRoles(req, res) {
    try {
        await rp.roles.findAll()
            .then((result) => {
                let value = [];
                result.forEach(i => {
                    value.push(i.dataValues);
                })
                res.json({
                    success: true,
                    data: value,
                })
            });
    } catch (err) {
        res.json({
            success: false,
            reason: err.message
        })
    }
}

async function postRole(req, res) {
    try {
        await rp.roles.create({
                name_role: req.body.name_role
            })
            .then(() => {
                res.json({
                    success: true
                })
            })
    } catch (err) {
        res.json({
            success: false,
            result: err.message
        })
    }
}

async function deleteRole(req, res) {
    const { name_role } = req.query
    try {
        await rp.roles.destroy({
                where: { name_role: name_role }
            })
            .then(() => {
                res.json({
                    success: true
                });
            })
    } catch (err) {
        res.json({
            success: false,
            reason: err.message
        })
    }
}

async function getPrivileges(req, res) {
    try {
        await rp.privileges.findAll()
            .then((result) => {
                let value = [];
                result.forEach(i => {
                    value.push(i.dataValues);
                })
                res.json({
                    success: true,
                    data: value,
                })
            });
    } catch (error) {
        res.json({
            success: false,
            reason: error.message
        })
    }
}

async function getPrivilegesForRoles(req, res) {
    const { role_id } = req.query;
    try {
        await rp.roles_privileges.findAll({
                attributes: ['id'],
                where: { role_id: role_id },
                include: [
                    { model: rp.privileges, attributes: ['name', 'alias'], required: true },
                    { model: rp.roles, attributes: ['name_role'], require: true }
                ]
            })
            .then((result) => {
                const value = [];
                result.forEach(i => {
                    value.push(i.dataValues);
                })
                res.send(value);
            })
    } catch (err) {
        res.json({
            success: false,
            reason: err.message
        })
    }
}

async function addPrivilegesForRoles(req, res) {
    const { role_id, privileges_id } = req.query;
    try {
        await rp.roles_privileges.create({
                role_id: role_id,
                privileges_id: privileges_id
            })
            .then(() => {
                res.json({
                    success: true
                })
            })
    } catch (error) {
        res.json({
            success: false,
            reason: error.message
        })

    }
}

async function deletePrivilegesForRoles(req, res) {
    const { id } = req.query;
    try {
        await rp.roles_privileges.destroy({
                where: { id: id }
            })
            .then(() => {
                res.json({
                    success: true
                })
            })
    } catch (error) {
        res.json({
            success: false,
            reason: error.message
        })
    }
}

module.exports = {
    getStudents,
    getStudent,
    putStudents,
    deleteStudents,
    postStudents,
    getRoles,
    postRole,
    deleteRole,
    getPrivileges,
    getPrivilegesForRoles,
    addPrivilegesForRoles,
    deletePrivilegesForRoles
}