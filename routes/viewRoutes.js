const express = require('express')
const viewController = require('../controllers/viewController')
const authController = require('../controllers/authController')
const studentController = require('../controllers/studentController')
const router = express.Router();

// router.use(authController.isLoggedIn)


// view Routes for student 
router.get('/',viewController.getsHome)
router.route('/logins').get(viewController.getsLoginStudent).post(authController.login)
router.get('/signups',viewController.getsSignupStudent)
router.get('/signup', viewController.getSignup)
router.get('/forgetpassword', viewController.getForgetPassword)

router.get('/student', authController.protect, viewController.getStudentLanding)
router.get('/student/mycourses',  viewController.getMyCourse)
router.get('/student/mycourses/:slug',  viewController.getCourseDetails)
router.get('/student/tutors',  viewController.getTutorFind) 
router.get('/student/webinar',  viewController.getWebinar)
router.get('/student/online',  viewController.getOnline)
router.get('/student/tasks',  viewController.getTask)
router.get('/student/profile',  viewController.getProfile)
router.get('/student/profile/edit',  viewController.getProfileEdit)
router.get('/student/course', viewController.getCourseDetails)  

// router.get('/allCourses',viewController.getAllCourses)

//view routes for Tutor 
router.get('/logint',viewController.getsLoginTutor)
router.get('/reg',viewController.getsSignupTutor)
router.get('/tutors', viewController.getsTutorLanding)
router.get('/tutors/profile', viewController.getsTutorProfile)
router.get('/tutors/profile/edit', viewController.getsTutorProfileEdit)
router.get('/tutors/portfolio', viewController.getsPortfolio)

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

