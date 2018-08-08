const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const adminController = require('../../controller/admincontroller')
const verifyPrivilege = require('../../middleware/verifyPrivileges');
const verifyToken = require('../../middleware/verify-token');

//router.use(verifyToken.verifyToken);

router.get('/work_with_students', adminController.getStudents);

router.get('/work_with_student', adminController.getStudent);

router.put('/work_with_students/:id', adminController.putStudents);

router.delete('/work_with_students/:id', adminController.deleteStudents);

router.post('/work_with_students', adminController.postStudents);

router.get('/work_with_roles', adminController.getRoles);

router.post('/work_with_roles', adminController.postRole);

router.delete('/work_with_roles', adminController.deleteRole);

router.get('/work_with_privileges', adminController.getPrivileges);

router.get('/work_with_roles_privileges', adminController.getPrivilegesForRoles);

router.post('/work_with_roles_privileges', adminController.addPrivilegesForRoles);

router.delete('/work_with_roles_privileges', adminController.deletePrivilegesForRoles)

router.post('/config', adminController.configStudentJoinEvent);

module.exports = router;