const conn = require('../config');

function getInformation(req, res) {
    let sql = `SELECT * from account WHERE account.id = ${req.tokenData.idaccount}`;
    conn.query(sql, function(err, result) {
        if (err) console.log(err);
        else {
            res.json({
                success: true,
                data: result
            })
        }
    })
}

function changeEmailAndNumber(req, res) {
    const sql = `UPDATE account SET  email = "${req.body.email}", phonenumber = "${req.body.phonenumber} WHERE MSSV = ${req.tokenData.idaccount} `;
    conn.query(sql, function(err, result) {
        if (err) console.log(err);
        else {
            data = {
                success: true,
                message: "Updated"
            }
            res.send(data);
        }
    })
}

function studentJoinEvent(req, res) {
    let sql = `INSERT INTO students_register_event(id_stu, id_eve) value(${req.body.id_sv}, ${req.body.id_event})`;
    conn.query(sql, function(err, result) {
        if (err) console.log(err);
        else {
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