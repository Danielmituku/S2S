const express = require('express')
const viewController = require('../controllers/viewController')
const authController = require('../controllers/authController')
const router = express.Router();

router.use(authController.isLoggedIn)


// view Routes for student 
router.get('/',viewController.getsHome)
router.get('/logins',viewController.getsLoginStudent)
router.get('/signups',viewController.getsSignupStudent)
router.get('/signup', viewController.getSignup)
router.get('/forgetpassword', viewController.getForgetPassword)

router.get('/student', authController.isLoggedIn,authController.protect, viewController.getStudentLanding)
router.get('/student/mycourses', authController.isLoggedIn, authController.protect, viewController.getMyCourse)
router.get('/student/mycourses/:slug', authController.isLoggedIn, authController.protect, viewController.getCourseDetails)
router.get('/student/tutors', authController.isLoggedIn, authController.protect, viewController.getTutorFind)
router.get('/student/webinar', authController.isLoggedIn, authController.protect, viewController.getWebinar)
router.get('/student/online', authController.isLoggedIn, authController.protect, viewController.getOnline)
router.get('/student/tasks', authController.isLoggedIn, authController.protect, viewController.getTask)
router.get('/student/profile', authController.isLoggedIn, authController.protect, viewController.getProfile)
router.get('/student/profile/edit', authController.isLoggedIn, authController.protect, viewController.getProfileEdit)

// router.get('/allCourses',viewController.getAllCourses)

//view routes for Tutor 
router.get('/logint',viewController.getsLoginTutor)
router.get('/reg',viewController.getsSignupTutor)
router.get('/tutors', viewController.getsTutorLanding)
router.get('/tutors/profile', viewController.getsTutorProfile)
router.get('/tutors/profile/edit', viewController.getsTutorProfileEdit)
router.get('/tutors/portfolio', viewController.getsPortfolio)

module.exports = router

