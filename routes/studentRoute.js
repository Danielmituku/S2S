const express = require('express')

const studentController = require('../controllers/studentController')
const authController = require('../controllers/authController')

const router = express.Router();

router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login) 

router.route('/forgetPassword').post(authController.forgetPassword) 
router.route('/resetPassword/:token').patch(authController.resetPassword) 
router.route('/updateMyPassword').patch(authController.protect, authController.updatePassword) 


router.route('/').get(authController.protect, studentController.getAllStudent);
router.route('/:id').get(studentController.getStudent).patch(studentController.updateStudent).delete(authController.protect,authController.restrictTo('admin'),studentController.deleteStudent);

router.get('/login', studentController.getLoginForm);

module.exports = router; 