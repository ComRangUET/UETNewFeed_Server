const express = require('express');
const router = express.Router();
const adminController = require('../../controller/admincontroller')
const bodyParser = require('body-parser');

//find student By Id sv from data base
router.get('/find_by_id/:id', adminController.findStudentByIdFromDataBase);

router.get('/find_students_by_class/:class', adminController.findStudentsByClassFromDatabase);

router.get('/find_students_by_year/:year', adminController.findStudentsByYearFromDatabase);

router.post('/add_student_to_database', adminController.addStudentToDataBase);

router.get('/select_all_students', adminController.selectAllStudentsFromDataBase);

router.get('/get_infor_event_and_students/:id', adminController.getInforEventAndStudentsFromDatabase);

router.get('/find_score_of_student/:id', adminController.findScoreOfStudentBydataBase);

router.post('/add_score_to_student', adminController.addScoreToStudent);

router.delete('/delete_student/:id', adminController.deleteStudentFromDataBase);

router.post('/confirm_student_join_event', adminController.confirmStudentJoinEvent);

module.exports = router;