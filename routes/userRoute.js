const express = require("express")
const authController = require('./../controllers/authController')
const userController = require('./../controllers/userControlller')


const router = express.Router()

router.route('/signup').post(authController.creatUser);
router.route('/').get(userController.getAllUser);

module.exports = router;