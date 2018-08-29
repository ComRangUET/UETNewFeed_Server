const express = require('express');
const router = express.Router();
const student = require('../../controller/studentcontroller')
const verifyModel = require('../../middleware/verify-token');


router.get('/', verifyModel.verifyToken,  student.getStudent);

router.put('/', verifyModel.verifyToken,  student.putStudent);

router.post('/', verifyModel.verifyToken,  student.studentRegisterEvent);

router.get('/events', verifyModel.verifyToken, student.getEvent);


module.exports = router;