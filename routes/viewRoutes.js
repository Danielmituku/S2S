const express = require('express')
const viewController = require('../controllers/viewController')
const authController = require('../controllers/authController')
const authControllerTutor = require('../controllers/authControllerTutor')
const studentController = require('../controllers/studentController')
const router = express.Router();

// router.use(authController.isLoggedIn)


// view Routes for student 
router.get('/', viewController.getsHome)
router.route('/logins').get(viewController.getsLoginStudent)
router.post('/student', authController.login)
router.get('/signups',viewController.getsSignupStudent)
router.get('/signup', viewController.getSignup)
router.get('/forgetpassword', viewController.getForgetPassword)

// router.use(authController.isLoggedIn)

router.get('/student',  authController.protect,viewController.getStudentLanding)
router.get('/student/mycourses', authController.protect, viewController.getMyCourse)
router.get('/student/mycourses/:slug',  authController.protect,viewController.getCourseDetails)
router.get('/student/tutors', authController.protect, viewController.getTutorFind) 
router.get('/student/webinar', authController.protect, viewController.getWebinar)
router.get('/student/online', authController.protect, viewController.getOnline)
router.get('/student/tasks', authController.protect, viewController.getTask)
router.get('/student/profile', authController.protect, viewController.getProfile)
router.get('/student/profile/edit', authController.protect, viewController.getProfileEdit)
router.get('/student/course',authController.protect, viewController.getCourseDetails)  

// router.get('/allCourses',viewController.getAllCourses)

//view routes for Tutor 
router.get('/logint',viewController.getsLoginTutor)
router.post('/tutors', authControllerTutor.login)
router.get('/reg', viewController.getsSignupTutor)

router.get('/tutors',authControllerTutor.protect,  viewController.getsTutorLanding)
router.get('/tutors/profile', authControllerTutor.protect, viewController.getsTutorProfile)
router.get('/tutors/profile/edit', authControllerTutor.protect, viewController.getsTutorProfileEdit)
router.get('/tutors/portfolio', authControllerTutor.protect, viewController.getsPortfolio)

//routes for Admin
router.get('/dashbord', viewController.getDashbord)
router.get('/dashbord/add-course', viewController.getCourse)
router.get('/dashbord/all-courses', viewController.getAllCourse)
router.get('/dashbord/add-student', viewController.getStudent)
router.get('/dashbord/all-student', viewController.getAllStudent)
router.get('/dashbord/add-tutor', viewController.getTutor)
router.get('/dashbord/all-tutors', viewController.getAllTutor)
router.get('/dashbord/all-events', viewController.getAllEvents)
router.get('/dashbord/add-events', viewController.getEvent) 
router.get('/dashbord/all-time-table', viewController.getAllTimeTable)
router.get('/dashbord/add-time-table', viewController.getTimeTable)
router.get('/dashbord/all-notice', viewController.getAllNotice)
router.get('/dashbord/add-notice', viewController.getNotice)
router.get('/dashbord/all-reviews', viewController.getAllReviews)
router.get('/dashbord/add-reviews', viewController.getReviews)


module.exports = router

