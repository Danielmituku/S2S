const express = require('express')
const viewController = require('../controllers/viewController')
const authController = require('../controllers/authController')
const router = express.Router();

router.use(authController.isLoggedIn)

router.get('/',viewController.getsHome)
router.get('/logins',viewController.getsLoginStudent)
router.get('/logint',viewController.getsLoginTutor)
router.get('/signupt',viewController.getsSignupTutor)
router.get('/signups',viewController.getsSignupStudent)



// router.get('/allCourses',viewController.getAllCourses)

module.exports = router

