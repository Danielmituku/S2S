const express = require('express')
const viewController = require('../controllers/viewController')
const authController = require('../controllers/authController')
const router = express.Router();

// router.use(authController.isLoggedIn)


// view Routes for student 
router.get('/',viewController.getsHome)
router.get('/logins',viewController.getsLoginStudent)
router.get('/signups',viewController.getsSignupStudent)
router.get('/signup', viewController.getSignup)
router.get('/forgetpassword', viewController.getForgetPassword)

router.get('/student', viewController.getStudentLanding)
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
router.get('/dashbord/add-course', viewController.addCourse)

module.exports = router

