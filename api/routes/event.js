const express = require('express');
const router = express.Router();

const eventController = require('../../controller/eventController');
const verifyPrivileges = require('../../middleware/verifyPrivileges');
const verifyToken = require('../../middleware/verify-token');


//router.use(verifyToken.verifyToken);

router.get('/page', eventController.getlistE);

router.get('/:id_eve', eventController.getEvent);

router.get('/', eventController.getEvents);

router.put('/:id_eve',verifyToken.verifyToken, verifyPrivileges('update_data'),eventController.putEvents);

router.post('/',verifyToken.verifyToken, verifyPrivileges('create_data'), eventController.postEvent);

router.delete('/:id_eve',verifyToken.verifyToken, verifyPrivileges('delete_data'), eventController.deleteEvents);

router.get('/list_students_register_event/:id_eve',verifyToken.verifyToken, verifyPrivileges('read_data'),eventController.getListStuRegisterEvent);

router.get('/list_events/config',eventController.getListEventsNeedConfig);

router.get('/list_students_join_event/:id_eve',verifyToken.verifyToken, verifyPrivileges('read_data'),eventController.getStudentsJoinEvent );

module.exports = router;