const conn = require('../config');

function getInformation(req, res){
    let sql = `SELECT * from student inner join diemchuyencan on diemchuyencan.id = student.sv_id WHERE student.masv = ${req.params.masv}`;
    conn.query(sql, function(err, result){
        if(err) console.log(err);
        else{
            res.send(result);
        }
    })
}

function changeEmailAndNumber(req, res){
    var emailsv = req.body.email;
    var sodt = req.body.sodienthoai;
    var maso = req.body.masosv;
    if(sodt=="")
        var sql = `UPDATE student SET email = "${req.body.email}"  WHERE masv = ${req.body.masosv}`;
    else if(emailsv=="")
        var sql = `UPDATE student SET sodienthoai = "${req.body.sodienthoai}" WHERE masv = ${req.body.masosv} `;
    else    var sql = `UPDATE student SET  email = "${req.body.email}", sodienthoai = "${req.body.sodienthoai}" WHERE masv = ${req.body.masosv} `;
    conn.query(sql, function(err,result){
        if(err) console.log(err);
        else{
            data = {
                success: true,
                message: "Updated"
            }
            res.send(data);
        }
    })
}

function studentJoinEvent(req, res){
    let sql = `INSERT INTO student_join_event(id_stu, id_eve) value(${req.body.id_sv}, ${req.body.id_event})`;
    conn.query(sql, function(err, result){
        if(err) console.log(err);
        else{
            let dataresult = {
                success: true,
                data: "Register join done"
            }
            res.send(dataresult);
        }
    })
}


module.exports.getInformation = getInformation;
module.exports.changeEmailAndNumber = changeEmailAndNumber;
module.exports.studentJoinEvent = studentJoinEvent;