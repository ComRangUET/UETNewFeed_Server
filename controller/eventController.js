

const events = require('../models/eventmodels');
const register = require('../models/registermodels');
const accounts = require('../models/accountmodels');

function getlistE(req, res){
    
    try{
        events.count().then(function(result){
            return res.json({
                success: true,
                data: result
            })
        })
    }
    catch(err){
        return res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}

function getEvents(req, res) {
    
    const { index } = req.query;
    try {
        let listEvent = [];
        events.findAll({
            order: [
                ['id', 'DESC']
            ],
            offset: 8 * index,
            limit: 8,
            attributes: ['id', 'header', 'image', 'place', 'time_start']
        }).then(function (result) {
            result.forEach(function (i) {
                listEvent.push(i.dataValues);
            })
        })
            .then(function () {
                if(listEvent == "")
                {
                    return res.json({
                        success: true,
                        end: true,
                        data: null
                    })
                } else{
                    return res.json({
                        success: true,
                        data: listEvent,
                        end: false
                    })
                }
                
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

function getEvent(req, res) {
    const { id_eve } = req.params;
    try {
        events.findOne({
            where: {
                id: id_eve
            }
        })
        .then(function (result) {

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
    const { header, content, image, place, time_start, event_type , link_register} = req.body;

    try {
        if (!header || !content || !place || !time_start) throw new Error('Header or content or place or time_start or event_type are not require');
        await events.update({
            header: header,
            content: content,
            image: image,
            place: place,
            time_start: time_start,
            event_type: event_type,
            link_register: link_register
        },
            {
                where: {
                    id: req.params.id_eve
                }
            })
            .then(function () {
                return res.json({
                    success: true,
                    data: req.params.id_eve
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

        events.destroy({
            where: {
                id: req.params.id_eve
            }
        })
            .then(function () {
                return res.json({
                    success: true,
                    data: null
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

function postEvent(req, res) {
    const { header, content, introduce, image, place, time_start, event_type, link_register } = req.body;

    try {
        if (!header || !content || !place || !time_start) throw new Error('header or conntent or place or time_start aren not require');

        events.create({
            header: header,
            content: content,
            place: place,
            time_start: time_start,
            event_type: event_type,
            image: image,
            introduce: introduce,
            link_register: link_register
        })
            .then(function (result) {
                res.json({
                    success: true,
                    data: result.dataValues.id,
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
                    { model: accounts, attributes: ['full_name'], required: true }
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
        res.json({
            success: false,
            data: null,
            reason: err.message
        })
    }
}

function getListEventsNeedConfig(req, res) {
    try{
        events.findAll({
            where: {
                event_type: 1
            },
            order: [
                ['id', 'DESC']
            ],
            attributes: ['header', 'id'],
        }).then(function(result){
            let listEvent = [];
            result.forEach(function(e){
                listEvent.push(e.dataValues);
            })

            return res.json({
                success: true,
                data: listEvent
            })
        })
    }
    catch(err){
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
                return res.json({
                    success: true,
                    data: null,
                    reason: err.message
                })
            })
    }
    catch (err) {
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
    getStudentsJoinEvent,
    getlistE
}
