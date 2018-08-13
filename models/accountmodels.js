const Sequelize = require('sequelize');

const con = require('../config');
const course = require('../models/coursemodels');
const faculty = require('../models/facultymodels');
const class_name = require('../models/class_namemodels');


const account = con.define('account', {
    role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 2
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
        validate: { isEmail: { msg: "Email bạn nhập không hợp lệ." } }
    },
    fullname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phonenumber: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        validate: {
            len: { args: [7, 20], msg: "Số điện thoại bạn nhập không hợp lệ." },
            isNumeric: { msg: "Số điện thoại bạn nhập không hợp lệ." }
        }
    },
    MSSV: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    id_class: {
        type: Sequelize.INTEGER
    },
    id_faculty: {
        type: Sequelize.INTEGER
    },
    id_course: {
        type: Sequelize.INTEGER
    },
    token: {
        type: Sequelize.STRING
    }
},
    {
        timestamps: false,
        freezeTableName: true
    });

account.belongsTo(class_name, {foreignKey: 'id_class'});
account.belongsTo(faculty, {foreignKey: 'id_faculty'});
account.belongsTo(course, {foreignKey: 'id_course'});
module.exports = account;