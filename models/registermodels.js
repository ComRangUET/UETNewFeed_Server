const Sequelize = require('sequelize');

const con = require('../config');
const accounts = require('../models/accountmodels');
const events = require('../models/eventmodels');

const register = con.define('students_register_event', {
    id_eve: {
        type: Sequelize.INTEGER
    },
    id_stu: {
        type: Sequelize.INTEGER
    },
    default_student: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    joined: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
        allowNull: false,
    }
},
    {
        timestamps: false,
        freezeTableName: true
    }
);

register.belongsTo(accounts, {foreignKey: 'id_stu'});
register.belongsTo(events, {foreignKey: 'id_eve'})

module.exports = register;