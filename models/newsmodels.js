const Sequelize = require('sequelize');

const con = require('../config');


const news = con.define('news', {
    header: {
        type: Sequelize.TEXT
    },
    introduce: {
        type: Sequelize.TEXT
    },
    content: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING,
    }
},
    {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = news;