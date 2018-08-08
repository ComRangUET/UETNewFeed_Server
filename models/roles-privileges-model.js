const sequelize = require('sequelize');
const con = require('../config');
const account = require('./accountmodels');

const roles = con.define('roles', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_role: {
        type: sequelize.STRING,
    }
}, {
    timestamps: false,
    freezeTableName: true
})

const privileges = con.define('privileges', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize.STRING
    },
    alias: {
        type: sequelize.STRING
    }
}, {
    timestamps: false,
    freezeTableName: true
})



const roles_privileges = con.define('roles_privileges', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role_id: {
        type: sequelize.INTEGER
    },
    privileges_id: {
        type: sequelize.INTEGER
    }
}, {
    timestamps: false,
    freezeTableName: true
});

roles_privileges.belongsTo(privileges, { foreignKey: 'privileges_id' });
account.belongsTo(roles, { foreignKey: 'role_id' });

module.exports = {
    roles,
    roles_privileges,
    privileges
}