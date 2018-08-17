const Sequelize = require('sequelize');
const con = new Sequelize('qldv', 'root', '123456789', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

//con.sync();

module.exports = con; 