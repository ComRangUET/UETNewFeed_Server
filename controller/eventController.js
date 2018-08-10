const event = require('../models/eventmodels');
const register = require('../models/registermodels');
const  account = require('../models/accountmodels');


function getEvents(req, res) {
    const { index } = req.query;
    try {
        let listEvent = [];
        event.findAll({
            order: [
                ['id_eve', 'DESC']
            ],
            offset: 8 * index,
            limit: 8,
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
        if (id_event == null) throw new Error("id_event invalid");
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
            .catch(function (err) {
                return res.json({
                    success: false,
                    data: null,
                    reason: err.message
                })
            })
    }
    catch (err) {
        res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}

async function putEvents(req, res) {
    const { header, content, image, place, time_start, event_type } = req.body;

    try {
        if (!header || !content || !place || !time_start) throw new Error('Header or content or place or time_start or event_type are not require');
        await event.update({
            header: header,
            content: content,
            image: image,
            place: place,
            time_start: time_start,
            event_type: event_type
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
                event.findAll().then(function (result) {
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

function postEvent(req, res) {
    const { header, content, image, place, time_start, event_type } = req.body;

    try {
        if (!header || !content || !place || !time_start) throw new Error('header or conntent or place or time_start aren not require');

        event.create({
            header: header,
            content: content,
            place: place,
            time_start: time_start,
            event_type: event_type,
            image: image
        })
            .then(function (result) {
                let listEvent = [];
                event.findAll().then(function (result) {
                    result.forEach(function (i) {
                        listEvent.push(i.dataValues);
                    })
                })
                    .then(function () {
                        res.json({
                            success: true,
                            data: listEvent,
                            id_eve: result.dataValues.id_eve
                        })
                    })
            })

    }
    catch (err) {
        res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}

function getListStuRegisterEvent(req, res) {
    try {
        register.findAll(
            {
                where: {
                    id_eve: req.params.id_eve
                },
                include: [
                    {model: account, attributes: ['fullname', 'id'], required: true}
                ],
            }).then(function (result) {
                let listSv = [];
                result.forEach(function (sv) {
                    listSv.push(sv.dataValues);
                })
                return res.json({
                    success: true,
                    data: listSv
                })
            })
    }
    catch (err) {
        console.log(err);
        res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}

function getListEventsNeedConfig(req, res) {
    try {
        event.findAll({
            where: {
                event_type: 1
            },
            order: [
                ['id_eve', 'DESC']
            ],
            attributes: ['header', 'id_eve'],
        }).then(function (result) {
            let listEvent = [];
            result.forEach(function (e) {
                listEvent.push(e);
            })

            return res.json({
                success: true,
                data: listEvent
            })
        })
    }
    catch (err) {
        return res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}

function getStudentsJoinEvent(req, res) {
    try {
        register.findAll({
            where: {
                id_eve: req.params.id_eve,
                joined: 1
            }
        })
            .then(function (result) {
                let listSv = [];
                result.forEach(function (sv) {
                    listSv.push(sv);
                })
                return res.json({
                    success: true,
                    data: listSv.length
                })
            })
            .catch(function (err) {
                console.log(err);
                return res.json({
                    success: true,
                    data: null,
                    reason: err.message
                })
            })
    }
    catch (err) {
        console.log(err);
        return res.json({
            success: true,
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
    postEvent,
    getListStuRegisterEvent,
    getListEventsNeedConfig,
    getStudentsJoinEvent
}
