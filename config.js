const mysql = require('mysql');

const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'inforofstudent',
    multipleStatements: true
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

