const express = require('express')

const studentController = require('../controllers/studentController')
const authController = require('../controllers/authController')


const router = express.Router();

router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)
router.route('/logout').get(authController.logout) 


router.route('/forgetPassword').post(authController.forgetPassword) 
router.route('/resetPassword/:token').patch(authController.resetPassword) 

router.get('/me', authController.protect, studentController.getMe, studentController.getStudent)
router.route('/').get(authController.protect, studentController.getAllStudent);
router.route('/:id').get(studentController.getStudent).patch(studentController.updateStudent).delete(authController.protect,authController.restrictTo('admin'),studentController.deleteStudent);


router.get('/login', studentController.getLoginForm);
router.route('/login', studentController.getloginForm)



module.exports = router; 