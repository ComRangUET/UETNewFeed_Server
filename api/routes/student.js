const express = require('express');
const router = express.Router();
const student = require('../../controller/studentcontroller')
const verifyModel = require('../../middleware/verify-token');

router.use(verifyModel.verifyToken);

router.get('/get_info', student.getInformation);

router.put('/change_info', student.changeEmailAndNumber);

router.post('/register_join_event/:id_event', student.studentJoinEvent);


module.exports = router;