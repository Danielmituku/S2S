const express = require('express')

const studentController = require('../controllers/studentController')
const authController = require('../controllers/authController')


const router = express.Router();

router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)
router.route('/logout').get(authController.logout) 
router.route('/forgetPassword').post(authController.forgetPassword) 
router.route('/resetPassword/:token').patch(authController.resetPassword) 
// router.get('/login', studentController.getLoginForm);
// router.route('/login', studentController.getloginForm)


//Protect all routes after this middleware
router.use(authController.protect)
 
router.patch('/updateMyPassword',authController.updatePassword)

router.patch('/updateMe', studentController.updateMe)
router.delete('/deleteMe', studentController.deleteMe)
router.get('/me', studentController.getMe, studentController.getStudent)

router.use(authController.restrictTo('admin'))

router.route('/').get(studentController.getAllStudent).post(studentController.createStudent)
router.route('/:id').get(studentController.getStudent).patch(studentController.updateStudent).delete(authController.restrictTo('admin'), studentController.deleteStudent);

module.exports = router; 