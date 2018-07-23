const conn = require('../config');

function getListEventAndMSSV(req,res){
    const sql =  `SELECT eventNeedStudent.header AS header, student.MSSV AS MSSV FROM student_join_event JOIN student ON student_join_event.id_stu = student.idstudent  JOIN eventNeedStudent ON student_join_event.id_eve = eventNeedStudent.id_eve`
    conn.query(sql, (err, rows, fields) => {
        if(!err){
            res.status(200).json(rows);
        } else {
            console.log(err);
        }
    })
}

function getInformationEvent(req, res) {
    conn.query('SELECT *FROM eventNeedStudent',(err, rows, fields) => {
        if(!err){
            res.status(200).json(rows);
        } else {
            console.log(err);
        }
    });
}

function postEvent(req,res) {
    const sql = 'INSERT INTO eventNeedStudent (header,content,image,place,time_start,eventNeedStudents) VALUES (?,?,?,?,?,?)'
    conn.query(sql ,[req.body.header,req.body.content,req.body.image,req.body.place,req.body.time,req.body.students],(err, result, fields) => {
            if(!err) {
                console.log('success' +result.header);
            } else {
                console.log(err);
            }
        });
}

function deleteEvent(req, res) {
    const sql = 'DELETE FROM eventNeedStudent WHERE id_eve = ? ';
    conn.query(sql, req.params.id, (err , result, fields) => {
        if(!err) {
            console.log('success');
            res.status(201).json({
                message: 'delete success'
            });
        } else {
            console.log(err);
        }
    });
}

function putEvent(req,res) {
    const sql = 'UPDATE eventNeedStudent SET header = " '+req.body.header+ ' ",place= " ' + req.body.place +' " WHERE id_eve = '+req.params.id;
    conn.query(sql, (err, result, fields) => {
        if(!err) {
            res.status(201).json({
                message: "success"
            });
        } else {
            res.sendStatus(500);
            console.log(err);
        }
    });
}


module.exports.getListEventAndMSSV = getListEventAndMSSV;
module.exports.getInformationEvent = getInformationEvent;
module.exports.postEvent = postEvent;
module.exports.deleteEvent = deleteEvent;
module.exports.putEvent = putEvent;