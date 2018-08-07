const mysql = require('mysql');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('qldv', 'root', '', {
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

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.account = require('./models/accountmodels')(sequelize, Sequelize);
db.event = require('./models/eventmodels')(sequelize, Sequelize);
db.news = require('./models/newsmodels')(sequelize, Sequelize);
db.register = require('./models/registermodels')(sequelize, Sequelize);




db.register.belongsTo(db.event, { foreignKey: 'id_eve' });
db.register.belongsTo(db.account, {foreignKey: 'id_stu'});

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'qldv'
});

conn.connect(function(err){
    if(err) console.log(err);
    else{
        console.log('connected');
    } 
}) 
    
module.exports.db = db;

module.exports.conn = conn;