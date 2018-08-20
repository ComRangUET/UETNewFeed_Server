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

router.get('/class', classController.getListClass);

router.put('/class/:id_class', classController.putClassName);

router.post('/class', classController.postNewClass);

router.delete('/class/:id_class', classController.deleteClass);


//course

router.get('/course', courseController.getCourse);

router.put('/course/:id_course', courseController.putCourse);

router.post('/course', courseController.postCourse);

router.delete('/course/:id_course', courseController.deleteCourse);


router.get('/get_list', system.getInforSchool);

router.post('/config', verifyPrivilege('roles_privileges'), adminController.configStudentJoinEvent);


router.post('/student_event', adminController.addStudentToEvent); 

module.exports = router;