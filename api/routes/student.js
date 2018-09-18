const express = require('express');
const router = express.Router();
const student = require('../../controller/studentcontroller')
const verifyToken = require('../../middleware/verify-token');

router.use(verifyToken.verifyToken);

router.get('/',  student.getStudent);

router.put('/',  student.putStudent);

router.post('/',  student.studentRegisterEvent);

router.get('/events', student.getEvent);


module.exports = router;