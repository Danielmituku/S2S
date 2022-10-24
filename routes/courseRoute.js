const express = require('express')

const courseController = require('../controllers/courseController')
const authController = require('../controllers/authController')

const router = express.Router();


// router.param('id', courseController.checkId)


router.route('/Course-stats').get(courseController.getCourseStats);
router.route('/monthly-plan/:year').get(courseController.getMonthlyPlan);

router.route('/top-5-cheap').get(courseController.aliasTopCourses,courseController.getAllCourses);
router.route('/').post(courseController.createCourse).get(authController.protect,courseController.getAllCourses);
router.route('/:id').get(courseController.getCourse).patch(courseController.updateCourse).delete(courseController.deleteCourse).post(courseController.createCourse);

module.exports = router;
