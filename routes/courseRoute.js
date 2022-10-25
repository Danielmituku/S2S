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
router.route('/monthly-plan/:year').get(courseController.getMonthlyPlan);

router.route('/top-5-cheap').get(courseController.aliasTopCourses,courseController.getAllCourses);
router.route('/').post(courseController.createCourse).get(authController.protect,courseController.getAllCourses);

router.route('/:id').get(courseController.getCourse).patch(courseController.updateCourse).delete(courseController.deleteCourse).post(courseController.createCourse);



module.exports = router;
