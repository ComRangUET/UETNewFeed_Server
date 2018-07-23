const mysql = require('mysql');
const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'sidznhat',
    password : 'pass1',
    database : 'sidz'
});

conn.connect(function(err) {
    // in case of error
    if(err){
        console.log(err.code);
        console.log(err.fatal);
    }
    else {
        console.log('connected!');
    }
});

module.exports = conn;