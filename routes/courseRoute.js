const express = require('express') 
const courseController = require('../controllers/courseController')
const authController = require('../controllers/authController')

// eslint-disable-next-line no-use-before-define
// router.param('id', tourController.checkId)

const router = express.Router();
router.route('/course-stats').get(courseController.getCourseStats);
router.route('/monthly-plan/:year').get(courseController.getMonthlyPlan);

router.route('/top-5-cheap').get(courseController.aliasTopCourse,courseController.getAllCourse);
router.route('/').post(courseController.createCourse).get(authController.protect,courseController.getAllCourse);
router.route('/:id').get(courseController.getCourse).patch(courseController.updateCourse).delete(courseController.deleteCourse).post(courseController.createCourse);

module.exports = router;