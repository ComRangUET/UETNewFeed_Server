const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const eventController = require('../../controller/eventController');
const verifyPrivileges = require('../../middleware/verifyPrivileges');
const verifyToken = require('../../middleware/verify-token');


router.use(verifyToken.verifyToken);

router.get('/work_with_event/:id_eve', eventController.getEvent);

router.get('/work_with_events/:index', eventController.getEvents);

router.put('/admin/work_with_events/:id_eve', eventController.putEvents);

router.post('/admin/work_with_events', eventController.postStudents);

router.delete('/admin/work_with_events/:id_eve', eventController.deleteEvents);


module.exports = router;