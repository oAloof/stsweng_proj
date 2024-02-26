const express = require('express')
const router = express.Router()

const taskController = require('../controllers/task.controller')

router.get('/getTasks', taskController.getTasks)
router.post('/getOneTask', taskController.getOneTask)
router.post('/create', taskController.create)
router.post('/update', taskController.delete)
router.post('/delete', taskController.delete)

module.exports = router
