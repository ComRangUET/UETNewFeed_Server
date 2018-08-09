const event = require('../models/eventmodels');
const register = require('../models/registermodels');


function getEvents(req, res) {
    const { index } = req.query;
    try {
        let listEvent = [];
        event.findAll({
            order: [
                ['id_eve', 'DESC']
            ],
            offset: 3 * index,
            limit: 3,
            attributes: ['id_eve', 'header', 'image', 'place', 'time_start']
        }).then(function (result) {
            result.forEach(function (i) {
                listEvent.push(i.dataValues);
            })
        })
            .then(function () {
                return res.json({
                    success: true,
                    data: listEvent
                })
            })
    }
    catch (err) {
        console.log('error: ', err);
        return res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}

function getEvent(req, res) {
    const { id_event } = req.query;
    try {
        event.findOne({
            where: {
                id_eve: id_event
            }
        }).then(function (result) {

            return res.json({
                success: true,
                data: result.dataValues
            })
        })
    }
    catch (err) {
        console.log('error', err);
        res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}

async function putEvents(req, res) {
    const { header, content, image, place, time_start } = req.body;

    try {
        if (!header || !content || !place || !time_start) throw new Error('Header or content or place or time_start are not require');
        await event.update({
            header: header,
            content: content,
            image: image,
            place: place,
            time_start: time_start
        },
            {
                where: {
                    id_eve: req.params.id_eve
                }
            })
            .then(async function () {
                await event.findOne({
                    where: {
                        id_eve: req.params.id_eve
                    }
                })
                    .then(function (result) {
                        return res.json({
                            success: true,
                            data: result.dataValues
                        })
                    })
            })
    }
    catch (err) {
        console.log('error', err);
        res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}

function deleteEvents(req, res) {
    try {
        register.destroy({
            where: {
                id_eve: req.params.id_eve
            }
        });

        event.destroy({
            where: {
                id_eve: req.params.id_eve
            }
        })
            .then(function () {
                let listEvent = [];
                table.event.findAll().then(function (result) {
                    result.forEach(function (i) {
                        listEvent.push(i.dataValues);
                    })
                })
                    .then(function () {
                        return res.json({
                            success: true,
                            data: listEvent
                        })
                    })
            })

    }
    catch (err) {
        console.log('error', err);
        return res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}

function postStudents(req, res) {
    const { header, content, image, place, time_start } = req.body;

    try {
        if (!header || !content || !place || !time_start) throw new Error('header or connter or place or time_start aren not require');

        event.create({
            header: header,
            content: content,
            place: place,
            time_start: time_start
        })
            .then(function () {
                let listEvent = [];
                event.findAll().then(function (result) {
                    result.forEach(function (i) {
                        listEvent.push(i.dataValues);
                    })
                })
                    .then(function () {
                        res.json({
                            success: true,
                            data: listEvent
                        })
                    })
            })

    }
    catch (err) {
        console.log('error', err);
        res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}

function getStuRegisterEvent(req, res){
    try{
        register.findAll({
            where: {
                id_eve: req.params.id_eve
            }
        }).then(function(result){
            let listSv = [];
            result.forEach(function(sv){
                listSv.push(sv.dataValues);
            })
            return res.json({
                success: true,
                data: listSv
            })
        })
    }
    catch(err){
        console.log(err);
        res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}




module.exports = {
    getEvent,
    getEvents,
    putEvents,
    deleteEvents,
    postStudents,
    getStuRegisterEvent
}
