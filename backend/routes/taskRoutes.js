const express = require('express')
const router = express.Router()

const taskController = require('../controllers/task.controller')

router.get('/getTasks', taskController.getTasks)
router.post('/getOneTask', taskController.getOneTask)
router.post('/create', taskController.create)
router.put('/update', taskController.update)
router.delete('/delete', taskController.delete)

module.exports = router
