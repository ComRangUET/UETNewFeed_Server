const Sequelize = require('sequelize');


const con = require('../config');


const events = con.define('events', {
    header: {
        type: Sequelize.TEXT
    },
    content: {
        type: Sequelize.TEXT
    },
    image: {
        type: Sequelize.STRING
    },
    place: {
        type: Sequelize.STRING
    },
    time_start: {
        type: Sequelize.DATE
    },
    event_type: {
        type: Sequelize.TINYINT
    },
    introduce: {
        type: Sequelize.STRING
    },
    link_register: {
        type: Sequelize.STRING,
        allowNull: true
    }
},
    {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = events;
