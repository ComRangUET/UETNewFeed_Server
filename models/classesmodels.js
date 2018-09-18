const Sequelize = require('sequelize');

const con = require('../config');

const classes = con.define('classes', {
    name: {
        type: Sequelize.STRING
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = classes;