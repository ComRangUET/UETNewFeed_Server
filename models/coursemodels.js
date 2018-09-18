const Sequelize = require('sequelize');

const con = require('../config');

const courses = con.define('course', {
    name: {
        type: Sequelize.INTEGER
    }
},
{
    timestamps: false,
});

module.exports = courses;