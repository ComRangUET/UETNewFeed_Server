const conn = require('../config');

function getInformation(req, res) {
    let sql = `SELECT * from account WHERE accout.id = ${req.tokenData.idaccount}`;
    conn.query(sql, function(err, rows) {
        if (err) {
            res.status(403).json({
                success: false,
                message: err.message
            });
        } else {
            res.json({
                success: true,
                data: rows[0]
            })
        }
    })
}

function changeEmailAndNumber(req, res) {
    const sql = `UPDATE account SET  email = "${req.body.email}", phonenumber = "${req.body.phonenumber}" WHERE id = ${req.tokenData.idaccount} `;
    conn.query(sql, function(err, result) {
        if (err) {
            res.status(403).json({
                success: false,
                message: err.message
            });
        } else {
            data = {
                success: true,
                message: "Updated"
            }
            res.send(data);
        }
    })
}

function studentJoinEvent(req, res) {
    let sql = `INSERT INTO students_register_event(id_stu, id_eve, default_student) value(${req.tokenData.idaccount}, ${req.params.id_event}, 0)`;

    conn.query(sql, function(err, result) {
        if (err) {
            res.status(403).json({
                success: false,
                message: err.message
            });
        } else {
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