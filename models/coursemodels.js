const Sequelize = require('sequelize');

const con = require('../config');

const course = con.define('course', {
    id_course: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    course: {
        type: Sequelize.INTEGER
    }
},
{
    timestamps: false,
    freezeTableName: true
});

module.exports = course;