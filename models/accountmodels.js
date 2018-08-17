const Sequelize = require('sequelize');

const con = require('../config');
const courses = require('../models/coursemodels');
const classes = require('../models/classesmodels');


const accounts = con.define('account', {
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
    full_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        validate: {
            len: { args: [7, 20], msg: "Số điện thoại bạn nhập không hợp lệ." },
            isNumeric: { msg: "Số điện thoại bạn nhập không hợp lệ." }
        }
    },
    mssv: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    id_class: {
        type: Sequelize.INTEGER
    },
    faculty: {
        type: Sequelize.STRING
    },
    id_course: {
        type: Sequelize.INTEGER
    },
    token: {
        type: Sequelize.STRING
    },
    avatar: {
        type: Sequelize.STRING
    }
},
    {
        timestamps: false,
    });

 accounts.belongsTo(classes, { foreignKey: 'id_class' });

accounts.belongsTo(courses, { foreignKey: 'id_course' }); 

module.exports = accounts;