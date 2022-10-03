const express = require('express')

const tutorController = require('../controllers/tutorController')
const authControllerTutor = require('../controllers/authControllerTutor')


const router = express.Router();

router.route('/signup').post(authControllerTutor.signup)
router.route('/login').post(authControllerTutor.login) 

router.route('/').get(authControllerTutor.protect, tutorController.getAllTutor)
router.route('/:id').get(tutorController.getTutor).patch(tutorController.updateTutor).delete(authControllerTutor.protect,authControllerTutor.restrictTo('admin'),tutorController.deleteTutor);

module.exports = router;