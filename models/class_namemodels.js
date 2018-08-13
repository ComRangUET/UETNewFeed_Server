const Sequelize = require('sequelize');

const con = require('../config');

const class_name = con.define('class_name', {
    id_class: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    class_name: {
        type: Sequelize.STRING
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = class_name;