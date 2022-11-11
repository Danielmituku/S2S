const express = require('express')

const courseController = require('../controllers/courseController')
const authController = require('../controllers/authController')
const reviewRouter = require('../routes/reviewRoute')
const router = express.Router();


// router.param('id', courseController.checkId)

//Nested Route 
//post course/32342/reviews
//get course/23423432
//post course/342323/reviwes/234232
router.use('/:courseId/reviews', reviewRouter)


router.route('/Course-stats').get(courseController.getCourseStats);
router.route('/monthly-plan/:year').get(authController.protect,authController.restrictTo('admin','tutor','student'),courseController.getMonthlyPlan);

router.route('/top-5-cheap').get(courseController.aliasTopCourses,courseController.getAllCourses);
router.route('/').post(authController.protect,authController.restrictTo('admin','tutor'),courseController.createCourse).get(courseController.getAllCourses);
 
router.route('/:id').get(courseController.getCourse).patch(authController.protect,authController.restrictTo('admin','tutor'),courseController.updateCourse).delete(authController.protect,authController.restrictTo('admin','tutor'),courseController.deleteCourse).post(authController.protect,authController.restrictTo('admin','tutor'),courseController.createCourse);



module.exports = router;
