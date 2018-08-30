const Sequelize = require('sequelize');

<<<<<<< HEAD
const con = new Sequelize('qldv', 'root', '', {
=======
const con = new Sequelize('qldv', 'root', '123456789', {
>>>>>>> 2cfc8d6e504bdcf59603eaca50580c16c90a3f27
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
