// const TaskModel = require('../models/task.model')
// const TaskController = {}

// TaskController.create = async (req, res) => {
//   TaskModel.createTask(req.body)
//     .then((task) => {
//       res.status(201).json(task)
//     })
//     .catch((err) => {
//       res.status(500).json(err)
//     })
// }

// module.exports = TaskController

const TaskModel = require('../models/task.model')
const TaskController = {}

TaskController.create = async (req, res) => {
  try {
    const task = await TaskModel.createTask(req.body)
    res.status(201).json(task)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = TaskController
