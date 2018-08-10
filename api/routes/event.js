const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const eventController = require('../../controller/eventController');
const verifyPrivileges = require('../../middleware/verifyPrivileges');
const verifyToken = require('../../middleware/verify-token');


//router.use(verifyToken.verifyToken);

router.get('/get_event', eventController.getEvent);

router.get('/', eventController.getEvents);

router.put('/:id_eve', verifyToken.verifyToken, verifyPrivileges('update_data'), eventController.putEvents);

router.post('/', verifyToken.verifyToken, verifyPrivileges('post_event'), eventController.postEvent);

router.delete('/:id_eve', verifyToken.verifyToken, verifyPrivileges('delete_data'), eventController.deleteEvents);

router.get('/get_list_students_register_event/:id_eve', eventController.getListStuRegisterEvent);

router.get('/get_list_events_need_config', eventController.getListEventsNeedConfig);

router.get('/get_students_join_event/:id_eve', eventController.getStudentsJoinEvent );
module.exports = router;