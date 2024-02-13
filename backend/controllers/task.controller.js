const TaskModel = require('../models/task.model')
const TaskController = {}

TaskController.create = async (req, res) => {
  TaskModel.createTask(req.body)
    .then((task) => {
      res.status(201).json(task)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
}

module.exports = TaskController
