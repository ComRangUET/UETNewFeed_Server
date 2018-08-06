const express = require('express');
const router = express.Router();

const eventController = require('../../controller/eventController');
const bodyParser = require('body-parser');

router.get('/work_with_event/:id_eve', eventController.getEvent);

router.get('/work_with_events', eventController.getEvents);

router.put('/work_with_events/:id_eve', eventController.putEvents);

router.post('/work_with_events', eventController.postStudents);

router.delete('/work_with_events/:id_eve', eventController.deleteEvents);


module.exports = router;