const conn = require('../config');


function findStudentByIdFromDataBase(req, res){
    let sql = `SELECT * FROM student WHERE sv_id = ${req.params.id}`;

    conn.query(sql, function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
}

function findStudentsByClassFromDatabase(req, res){
    let sql = `SELECT * FROM student WHERE lop = '${req.params.class}' `;
    conn.query(sql, function(err, result){
        if(err) console.log(err);
        else{
            res.send(result);
        }
    })
}

function findStudentsByYearFromDatabase(req, res){
    let sql = `SELECT * FROM student WHERE namhoc = '${req.params.Year}' `;
    conn.query(sql, function(err, result){
        if(err) console.log(err);
        else{
            res.send(result);
        }
    })
}

function addStudentToDataBase(req, res){
    let sql = `INSERT INTO student SET ?`;
    let person = {
        masv: req.body.masosv,
        ten: req.body.name,
    };
    conn.query(sql, person, function(err, result){
        if(err) console.log(err);
        else{
            let response1 = {
                success: "true",
                data: "Welcome " + req.body.name
            }
            res.send(response1);
        }
    })
}


function selectAllStudentsFromDataBase(req, res){
    let sql = 'SELECT * FROM student ';
    conn.query(sql, function(err, result){
        if(err) console.log(err);
        else{
            res.send(result);
        }
    })
}

function getInforEventAndStudentsFromDatabase(req, res){
    let sql = `SELECT * FROM student_join_event 
    INNER JOIN student ON student_join_event.id_stu = student.sv_id 
    INNER JOIN event_of_school ON student_join_event.id_eve = event_of_school.id_eve 
    WHERE student_join_event.id_eve = ${req.params.id}`;
    conn.query(sql, function(err, result){
        if(err) console.log(err);
        else{
            res.send(result);
        }
    })
}

function findScoreOfStudentBydataBase(req, res){
    let sql = `SELECT * FROM student inner join diemchuyencan on student.sv_id = diemchuyencan.id WHERE student.sv_id = ${req.params.id}`;
    conn.query(sql, function(err, result){
        if(err) console.log(err);
        else{
            res.send(result);
        }
    })
}

function addScoreToStudent(req, res){
     let sql = `UPDATE diemchuyencan SET  diemchuyencan.${req.body.diemN} = ${req.body.diemso} WHERE  diemchuyencan.id = ${req.body.id}`;
     conn.query(sql, function(err, result){
        if(err) console.log(err);
        else{
           let sql1 = `SELECT * From student inner join diemchuyencan on student.sv_id = diemchuyencan.id WHERE student.sv_id = ${req.body.id}`;
           conn.query(sql1, function(err, data){
               if(err)  console.log(err);
               else{
                   res.send(data);
               }
           })
        }
    })  
    
}

function deleteStudentFromDataBase(req, res){
    let sql =  `DELETE FROM student_join_event WHERE student_join_event.id_stu = ${req.params.id};`;
    sql += `DELETE FROM diemchuyencan WHERE diemchuyencan.id = ${req.params.id};`;
    sql += `DELETE FROM student WHERE student.sv_id = ${req.params.id};`;
    conn.query(sql, function(err, result){
        if(err) console.log(err);
        else{
            let dataresult = {
                success: true,
                data: "DELETE done"
            }
            res.send(dataresult);
        }
    })
}



function confirmStudentJoinEvent(req, res){
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
}

module.exports.findStudentByIdFromDataBase = findStudentByIdFromDataBase;

module.exports.findStudentsByClassFromDatabase = findStudentsByClassFromDatabase;

module.exports.addStudentToDataBase = addStudentToDataBase;

module.exports.findStudentsByYearFromDatabase = findStudentsByYearFromDatabase;

module.exports.selectAllStudentsFromDataBase = selectAllStudentsFromDataBase;

module.exports.getInforEventAndStudentsFromDatabase = getInforEventAndStudentsFromDatabase;

module.exports.addScoreToStudent = addScoreToStudent;

module.exports.findScoreOfStudentBydataBase = findScoreOfStudentBydataBase;

module.exports.deleteStudentFromDataBase = deleteStudentFromDataBase;

module.exports.confirmStudentJoinEvent = confirmStudentJoinEvent;

