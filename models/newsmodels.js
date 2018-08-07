const Sequelize = require('sequelize');

const con = require('../config');
    const news = con.define('news', {
        id_news: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        header: {
            type: Sequelize.TEXT
        },
        introduce_news: {
            type: Sequelize.TEXT
        },
        content: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        }
    },
        {
            timestamps: false,
            freezeTableName: true
        }
    );

    module.exports = news;