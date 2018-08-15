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
    introduce_eve: {
        type: Sequelize.STRING
    }
},
    {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = events;
