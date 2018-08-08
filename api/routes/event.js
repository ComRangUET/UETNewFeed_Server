const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const eventController = require('../../controller/eventController');
const verifyPrivileges = require('../../middleware/verifyPrivileges');
const verifyToken = require('../../middleware/verify-token');


//router.use(verifyToken.verifyToken);

router.get('/get_event', eventController.getEvent);

router.get('/', eventController.getEvents);

router.put('/:id_eve', eventController.putEvents);

router.post('/', eventController.postStudents);

router.delete('/:id_eve', eventController.deleteEvents);


module.exports = router;