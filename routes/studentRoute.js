const express = require('express')

const userController = require('../controllers/studentControlller')
const authController = require('../controllers/authController')

const router = express.Router();

router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login) 

router.route('/').get(studentController.getAllUser).post(studentController.createUsers);
router.route('/:id').get(studentController.getUser).patch(studentController.updateUser);

module.exports = router;