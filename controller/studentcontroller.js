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
    const emailsv = req.body.email;
    const sodt = req.body.sodienthoai;
    const sql = `UPDATE student SET  email = "${emailsv}", sodienthoai = "${sodt}" WHERE sv_id = ${req.tokenData.idaccount} `;
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
    let sql = `INSERT INTO student_join_event(id_stu, id_eve) value(${req.tokenData.idaccount}, ${req.body.id_event})`;
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