const Sequelize = require('sequelize');

const con = require('../config');


const account = con.define('account', {
    role_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false

    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        validate: { isEmail: { msg: "Email invalid." } }
    },
    course: {
        type: Sequelize.INTEGER
    },
    fullname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    major: {
        type: Sequelize.STRING
    },
    class_name: {
        type: Sequelize.DATE
    },
    phonenumber: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        validate: {
            len: { args: [7, 20], msg: "Phone number invalid, too short." },
            isNumeric: { msg: "not a valid phone number." }
        }
    },
    MSSV: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    token: {
        type: Sequelize.STRING
    }
}, {
        timestamps: false,
        freezeTableName: true
    });



module.exports = account;