const express = require('express');
const router = express.Router();
const student = require('../../controller/studentcontroller')


router.get('/get_infor/:masv', student.getInformation);


router.put('/change_infor', student.changeEmailAndNumber);

router.post('/register_join_evevnt', student.studentJoinEvent);


module.exports = router;