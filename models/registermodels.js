const Sequelize = require('sequelize');

const con = require('../config');

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
        }
    },
        {
            timestamps: false,
            freezeTableName: true
        }
    );
 
    module.exports = register;