const express = require('express')
const router = express.Router()

const taskController = require('../controllers/task.controller')

router.get('/getTasks', taskController.getTasks)
router.post('/create', taskController.create)

module.exports = router
