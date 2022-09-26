const express = require('express')

const userController = require('../controllers/tutorControlller')
const authController = require('../controllers/authController')

const router = express.Router();

router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login) 

router.route('/').get(tutorController.getAllUser).post(tutorController.createUsers);
router.route('/:id').get(tutorController.getUser).patch(tutorController.updateUser);

module.exports = router;