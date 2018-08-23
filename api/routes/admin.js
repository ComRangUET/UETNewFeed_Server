const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const adminController = require('../../controller/admincontroller');
const admin = require('../../controller/privileges_rolesController');
const classController = require('../../controller/classesController');
const courseController = require('../../controller/courseController');
const system = require('../../controller/class_systemController');
const verifyPrivilege = require('../../middleware/verifyPrivileges');
const verifyToken = require('../../middleware/verify-token');

router.use(verifyToken.verifyToken);

//Student
router.get('/students', verifyPrivilege('read_data'), adminController.getStudents);

router.get('/student/:mssv', verifyPrivilege('read_data'), adminController.getStudent);

router.put('/students/:id', verifyPrivilege('update_data'), adminController.putStudents);

router.delete('/students/:id', verifyPrivilege('delete_data'), adminController.deleteStudents);

router.post('/students', verifyPrivilege('add_user'), adminController.postStudents);

router.get('/students/image/:mssv', verifyPrivilege('read_data'), adminController.getImageStudent);

//Privilege and roles
router.get('/roles', verifyPrivilege('roles_privileges'), admin.getRoles);

router.post('/roles', verifyPrivilege('roles_privileges'), admin.postRole);

router.delete('/roles/:id_roles', verifyPrivilege('roles_privileges'), admin.deleteRole);

router.get('/privileges', verifyPrivilege('roles_privileges'), admin.getPrivileges);

router.get('/roles_privileges', verifyPrivilege('roles_privileges'), admin.getPrivilegesForRoles);

router.post('/roles_privileges', verifyPrivilege('roles_privileges'), admin.addPrivilegesForRoles);

router.delete('/roles_privileges/:id_roles_privileges', verifyPrivilege('roles_privileges'), admin.deletePrivilegesForRoles);


//class

router.get('/class',verifyPrivilege('read_data'), classController.getListClass);

router.put('/class/:id_class',verifyPrivilege('update_data'), classController.putClassName);

router.post('/class', verifyPrivilege('create_data'),classController.postNewClass);

router.delete('/class/:id_class', verifyPrivilege('delete_data'), classController.deleteClass);


//course

router.get('/course', verifyPrivilege('read_data'),courseController.getCourse);

router.put('/course/:id_course', verifyPrivilege('update_data'), courseController.putCourse);

router.post('/course', verifyPrivilege('create_data'),courseController.postCourse);

router.delete('/course/:id_course', verifyPrivilege('delete_data'),courseController.deleteCourse);


router.get('/get_list', verifyPrivilege('read_data'),system.getInforSchool);

router.post('/config', verifyPrivilege('confirm_stu_join_event'), adminController.configStudentJoinEvent);

router.post('/student_event', verifyPrivilege('add_user'),adminController.addStudentToEvent); 

router.post('/role_user', verifyPrivilege('add_user_with_role'), adminController.addUserWithRole);

module.exports = router;