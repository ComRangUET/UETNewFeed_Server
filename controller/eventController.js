const conn = require('../config');

function getListEvent(req, res) {
    const sql = `SELECT * FROM event`
    conn.query(sql, function(err, result) {
        if (err) console.log(err);
        else {
            res.send(result);
        }
    })
}

function postEvent(req, res) {
    const sql = 'INSERT INTO event (header,content,image,place,time_start,students) VALUES (?,?,?,?,?,?)'
    conn.query(sql, [req.body.header, req.body.content, req.body.image, req.body.place, req.body.time, req.body.students], (err, result, fields) => {
        if (!err) {
            let data = {
                success: true,
                data: "Post done"
            }
            res.send(data);
        } else {
            console.log(err);
        }
    });
}

function deleteEvent(req, res) {
    const sql = 'DELETE FROM event WHERE id_eve = ? ';
    conn.query(sql, req.params.id, (err, result, fields) => {
        if (!err) {
            console.log('success');
            res.status(201).json({
                message: 'delete success'
            });
        } else {
            console.log(err);
        }
    });
}

function putEvent(req, res) {
    const sql = 'UPDATE event SET header = " ' + req.body.header + ' ",place= " ' + req.body.place + ' " WHERE id_eve = ' + req.params.id;
    conn.query(sql, (err, result, fields) => {
        if (!err) {
            res.status(201).json({
                message: "success"
            });
        } else {
            res.sendStatus(500);
            console.log(err);
        }
    });
}


module.exports.getListEvent = getListEvent;
module.exports.postEvent = postEvent;
module.exports.deleteEvent = deleteEvent;
module.exports.putEvent = putEvent;