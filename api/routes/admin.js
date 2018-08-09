const express = require('express');
const router = express.Router();
const adminController = require('../../controller/admincontroller')
const verifyPrivilege = require('../../middleware/verifyPrivileges');
const verifyToken = require('../../middleware/verify-token');

router.use(verifyToken.verifyToken);

router.get('/work_with_students', verifyPrivilege('read_student_information'), adminController.getStudents);

router.get('/work_with_student', verifyPrivilege('read_student_information'), adminController.getStudent);

router.put('/work_with_students/:id', verifyPrivilege('update_data'), adminController.putStudents);

router.delete('/work_with_students/:id', verifyPrivilege('delete_data'), adminController.deleteStudents);

router.post('/work_with_students', verifyPrivilege('add_user'), adminController.postStudents);

router.get('/work_with_roles', verifyPrivilege('roles_privileges'), adminController.getRoles);

router.post('/work_with_roles', verifyPrivilege('roles_privileges'), adminController.postRole);

router.delete('/work_with_roles', verifyPrivilege('roles_privileges'), adminController.deleteRole);

router.get('/work_with_privileges', verifyPrivilege('roles_privileges'), adminController.getPrivileges);

router.get('/work_with_roles_privileges', verifyPrivilege('roles_privileges'), adminController.getPrivilegesForRoles);

router.post('/work_with_roles_privileges', verifyPrivilege('roles_privileges'), adminController.addPrivilegesForRoles);

router.delete('/work_with_roles_privileges', verifyPrivilege('roles_privileges'), adminController.deletePrivilegesForRoles)

router.post('/config', verifyPrivilege('roles_privileges'), adminController.configStudentJoinEvent);

module.exports = router;