const conn = require('../config');

function getListEvent(req, res) {
    let { index } = req.query;
    const sql = `SELECT id_eve, header, image FROM event ORDER BY id_eve DESC LIMIT ${index}, 4`

    conn.query(sql, function(err, rows) {
        if (err) {
            res.status(403).json({
                success: false,
                message: err.message
            });
        } else {
            res.send(rows);
        }
    })
}

function getEventContent(req, res) {
    const sql = `SELECT header, content, place, time_start FROM event WHERE id_eve = ${req.params.id}`;
    conn.query(sql, (err, rows) => {
        if (err) {
            res.status(403).json({
                success: false,
                message: err.message
            });
        } else {
            res.send(rows[0]);
        }
    })
}

function postEvent(req, res) {
    const sql = 'INSERT INTO event (header,content,image,place,time_start) VALUES (?,?,?,?,?)'
    conn.query(sql, [req.body.header, req.body.content, req.body.image, req.body.place, req.body.time], (err, result, fields) => {
        if (!err) {
            let data = {
                success: true,
                data: "Post done"
            }
            res.send(data);
        } else {
            res.status(403).json({
                success: false,
                message: err.message
            });
        }
    });
}

function deleteEvent(req, res) {
    try {
        let sql1 = `DELETE FROM students_register_event WHERE students_register_event.id_event = ${req.params.id_event};`;
        conn.query(sql1, function(err, resulw) {
            if (err) {
                res.status(403).json({
                    success: false,
                    message: err.message
                });
            }
        });
        let sql2 = `DELETE FROM event WHERE event.id_eve = ${req.params.id_event};`;
        conn.query(sql2, (err, result, fields) => {
            if (!err) {
                console.log('success');
                res.status(201).json({
                    success: true,
                    message: 'delete success'
                });
            } else {
                res.status(403).json({
                    success: false,
                    message: err.message
                });
            }
        });
    } catch (error) {
        res.status(403).json({
            success: false,
            message: err.message
        });
    }
}

function putEvent(req, res) {
    const sql = 'UPDATE event SET header = " ' + req.body.header + ' ",place= " ' + req.body.place + ' " WHERE id_eve = ' + req.params.id;
    conn.query(sql, (err, result, fields) => {
        if (!err) {
            res.status(201).json({
                success: true,
                message: "Put done"
            });
        } else {
            res.status(403).json({
                success: false,
                message: err.message
            });
        }
    });
}


module.exports.getListEvent = getListEvent;
module.exports.postEvent = postEvent;
module.exports.deleteEvent = deleteEvent;
module.exports.putEvent = putEvent;
module.exports.getEventContent = getEventContent;