const express = require('express')

const tutorController = require('../controllers/tutorController')
const authControllerTutor = require('../controllers/authControllerTutor')


const router = express.Router();

router.route('/signup').post(authControllerTutor.signup)
router.route('/login').post(authControllerTutor.login)
router.route('/logout').get(authControllerTutor.logout) 
router.route('/forgetPassword').post(authControllerTutor.forgetPassword) 
router.route('/resetPassword/:token').patch(authControllerTutor.resetPassword) 
// router.get('/login', tutorController.getLoginForm);
// router.route('/login', tutorController.getloginForm)


//Protect all routes after this middleware
router.use(authControllerTutor.protect)
 
router.patch('/updateMyPassword',authControllerTutor.updatePassword)

router.patch('/updateMe', tutorController.updateMe)
router.delete('/deleteMe', tutorController.deleteMe)
router.get('/me', tutorController.getMe, tutorController.getTutor)

router.use(authControllerTutor.restrictTo('admin'))

router.route('/').get(tutorController.getAllTutor).post(tutorController.createTutor)
router.route('/:id').get(tutorController.getTutor).patch(tutorController.updateTutor).delete(authControllerTutor.restrictTo('admin'), tutorController.deleteTutor);

module.exports = router; 