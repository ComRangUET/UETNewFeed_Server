const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const adminController = require('../../controller/admincontroller')
const verifyPrivilege = require('../../middleware/verifyPrivileges');
const verifyToken = require('../../middleware/verify-token');

router.use(verifyToken.verifyToken);

router.get('/work_with_students', adminController.getStudents);

router.get('/work_with_student', adminController.getStudent);

router.put('/work_with_students/:id', adminController.putStudents);

router.delete('/work_with_students/:id', adminController.deleteStudents);

router.post('/work_with_students', adminController.postStudents);

//router.delete('/delete_student_register_event/:id', verifyPrivilege('delete_data'), adminController.deleteStudentRegisterEvent);

module.exports = router;