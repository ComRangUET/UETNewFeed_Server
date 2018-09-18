const Sequelize = require('sequelize');


const con = require('../config');

const interested = con.define('interested', {
    id_stu: {
        type: Sequelize.INTEGER
    },
    id_eve: {
        type: Sequelize.INTEGER
    }
},
{
    freezeTableName: true,
    timestamps: false
})

module.exports = interested