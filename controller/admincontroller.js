const conn = require('../config');


function findStudentByIdFromDataBase(req, res) {
    let sql = `SELECT * FROM account WHERE id = ${req.params.id}`;

    conn.query(sql, function (err, result) {
        if (err) {

            res.send(err);
        }
        else {
            res.send(result);
        }
    })
}

function findStudentByMSSVFromDataBase(req, res) {
    let sql = `SELECT * FROM account WHERE MSSV = ${req.params.masv}`;

    conn.query(sql, function (err, result) {
        if (err) {

            res.send(err);
        }
        else {
            res.send(result);
        }
    })
}

/* function findStudentsByClassFromDatabase(req, res){
    let sql = `SELECT * FROM student WHERE lop = '${req.params.class}' `;
    conn.query(sql, function(err, result){
        if(err) console.log(err);
        else{
            res.send(result);
        }
    })
} */

/* function findStudentsByYearFromDatabase(req, res){
    let sql = `SELECT * FROM student WHERE namhoc = '${req.params.Year}' `;
    conn.query(sql, function(err, result){
        if(err) console.log(err);
        else{
            res.send(result);
        }
    })
} */

function addStudentToDataBase(req, res) {
    let sql = `INSERT INTO account SET ?`;
    let person = {
        user: req.body.user,
        password: req.body.password,
        MSSV: req.body.masv
    };
    conn.query(sql, person, function (err, result) {
        if (err) console.log(err);
        else {
            res.send({
                success: true,
                message: "add done" 
            });
        }
    })
}


function selectAllStudentsFromDataBase(req, res) {
    let sql = 'SELECT * FROM account ';
    conn.query(sql, function (err, result) {
        if (err) console.log(err);
        else {
            res.send(result);
        }
    })
}

function getInforEventAndStudentsFromDatabase(req, res) {
    let sql = `SELECT * FROM students_event 
    INNER JOIN  account  ON account.id = students_event.id_stu 
    INNER JOIN event ON event.id_eve = students_event.id_eve 
    WHERE students_event.id_eve = ${req.params.id_event}`;
    conn.query(sql, function (err, result) {
        if (err) console.log(err);
        else {
            res.send(result);
        }
    })
}

/* function findScoreOfStudentBydataBase(req, res){
    let sql = `SELECT * FROM student inner join diemchuyencan on student.sv_id = diemchuyencan.id WHERE student.sv_id = ${req.params.id}`;
    conn.query(sql, function(err, result){
        if(err) console.log(err);
        else{
            res.send(result);
        }
    })
} */

/* function addScoreToStudent(req, res) {
    let sql = `INSERT INTO activepoint SET  activepoint.id_stu = ${req.body.id}, activepoint.id_eve = ${req.body.id_eve}, activepoint.scores = ${req.body.scores}`;
    conn.query(sql, function (err, result) {
        if (err) console.log(err);
        else {
           res.json({
               success: true,
               message: "add score done"
           })
        }
    })

} */

function deleteStudentFromDataBase(req, res) {
    let sql = `DELETE FROM students_register_event WHERE students_register_event.id_stu = ${req.params.id};`;
    sql += `DELETE FROM account WHERE account.id = ${req.params.id};`;
    conn.query(sql, function (err, result) {
        if (err) console.log(err);
        else {
            let dataresult = {
                success: true,
                data: "DELETE done"
            }
            return res.send(dataresult);
        }
    })
}



/* function confirmStudentJoinEvent(req, res){
    let sql = `UPDATE student_join_event SET joined = '1' WHERE student_join_event.id_stu = ${req.body.id_sv} AND student_join_event.id_eve = ${req.body.id_event}`;
    conn.query(sql, function(err, result){
        if(err) console.log(err);
        else{
            let dataresult = {
                success: true,
                data: "Confirm done"
            }
            res.send(dataresult);
        }
    })
} */

module.exports.findStudentByIdFromDataBase = findStudentByIdFromDataBase;

module.exports.findStudentByMSSVFromDataBase = findStudentByMSSVFromDataBase;

//module.exports.findStudentsByClassFromDatabase = findStudentsByClassFromDatabase;

module.exports.addStudentToDataBase = addStudentToDataBase;

//module.exports.findStudentsByYearFromDatabase = findStudentsByYearFromDatabase;

module.exports.selectAllStudentsFromDataBase = selectAllStudentsFromDataBase;

module.exports.getInforEventAndStudentsFromDatabase = getInforEventAndStudentsFromDatabase;

//module.exports.addScoreToStudent = addScoreToStudent;

//module.exports.findScoreOfStudentBydataBase = findScoreOfStudentBydataBase;

module.exports.deleteStudentFromDataBase = deleteStudentFromDataBase;

//module.exports.confirmStudentJoinEvent = confirmStudentJoinEvent;

