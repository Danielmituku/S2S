const express = require('express')
const viewController = require('../controllers/viewController')
const router = express.Router();

router.get('/',viewController.getsOverview)
router.get('/logins',viewController.getsLoginStudent)
router.get('/logint',viewController.getsLoginTutor)



module.exports = router

