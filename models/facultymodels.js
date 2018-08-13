const Sequelize = require('sequelize');


const con = require('../config');

const faculty = con.define('faculty', {
    id_faculty: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    faculty: {
        type: Sequelize.STRING
    }
},
{
    timestamps: false,
    freezeTableName: true
});

module.exports = faculty;