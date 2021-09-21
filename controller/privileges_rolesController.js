const rp = require('../models/roles-privileges-model');


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
            reason: err.message,
            message: "Có lỗi xảy ra"
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
            result: err.message,
            message: "Có lỗi xảy ra"
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
            reason: err.message,
            message: "Có lỗi xảy ra"
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
            reason: error.message,
            message: "Có lỗi xảy ra"
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
            reason: err.message,
            message: "Có lỗi xảy ra"
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
            reason: error.message,
            message: "Có lỗi xảy ra"
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
            reason: error.message,
            message: "Có lỗi xảy ra"
        })
    }
}


module.exports = {
    getRoles,
    postRole,
    deleteRole,
    getPrivileges,
    getPrivilegesForRoles,
    addPrivilegesForRoles,
    deletePrivilegesForRoles,
    
}