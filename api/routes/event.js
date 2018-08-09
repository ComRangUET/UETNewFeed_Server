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

router.post('/', verifyToken.verifyToken, verifyPrivileges('post_event'), eventController.postStudents);

router.delete('/:id_eve', verifyToken.verifyToken, verifyPrivileges('delete_data'), eventController.deleteEvents);

router.get('/listStudent/:id_eve', eventController.getStuRegisterEvent);
module.exports = router;