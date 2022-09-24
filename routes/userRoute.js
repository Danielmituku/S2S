const express = require('express')

const userController = require('../controllers/userControlller')
const authController = require('../controllers/authController')

const router = express.Router();

router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login) 

router.route('/').get(userController.getAllUser).post(userController.createUsers);
router.route('/:id').get(userController.getUser).patch(userController.updateUser);

module.exports = router;