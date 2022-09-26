const express = require('express')

const tutorController = require('../controllers/tutorController')
const authController = require('../controllers/authController')

const router = express.Router();

router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login) 

router.route('/').get(tutorController.getAllTutor).post(tutorController.createTutor);
router.route('/:id').get(tutorController.getTutor).patch(tutorController.updateTutor);

module.exports = router;