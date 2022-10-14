const express = require('express')

const studentController = require('../controllers/studentController')
const authController = require('../controllers/authController')

const router = express.Router();

router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)
router.route('/logout').get(authController.logout) 


router.route('/forgetPassword').post(authController.forgetPassword) 
router.route('/resetPassword/:token').patch(authController.resetPassword) 


router.route('/').get(authController.protect, studentController.getAllStudent);
router.route('/:id').get(studentController.getStudent).patch(studentController.updateStudent).delete(authController.protect,authController.restrictTo('admin'),studentController.deleteStudent);

<<<<<<< HEAD
router.get('/login', studentController.getLoginForm);
=======
router.route('/login', studentController.getloginForm)
>>>>>>> c13331c14df48aad02092bb1d75faee6625500e5

module.exports = router; 