const express = require('express')

const studentController = require('../controllers/studentController')
const authController = require('../controllers/authController')

const router = express.Router();

router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login) 

router.route('/').get(authController.protect, studentController.getAllStudent).post(studentController.createStudent);
router.route('/:id').get(studentController.getStudent).patch(studentController.updateStudent);

module.exports = router;