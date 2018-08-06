const express = require('express');
const router = express.Router();


const student = require('../../controller/studentcontroller')
const verifyModel = require('../../middleware/verify-token');


//router.use(verifyModel.verifyToken);

router.get('/:id', student.getStudent);

router.put('/:id', student.putStudent);

router.post('/', student.studentRegisterEvent);

module.exports = router;