const TaskModel = require('../models/task.model')
const TaskController = {}

/**
 * Retrieves all tasks of user.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns The tasks of the user.
 */
TaskController.getTasks = async (req, res) => {
  try {
    const response = await TaskModel.getTasks(req.body.userId) // ! To be changed. User ID should be taken from credentials field of the request from a cookie.
    if (!response.success) {
      return res.status(400).send(response)
    }
    res.status(200).send(response)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ success: false, error: 'Failed to get tasks.', result: null })
  }
}

/**
 * Creates a new task.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns The result of the operation, a success flag, and an error message if operation failed.
 */
TaskController.create = async (req, res) => {
  // Parse the request body and extract the task properties into another object.
  const task = {
    owner: req.body.owner, // ! To be changed. User ID should be taken from credentials field of the request from a cookie.
    taskName: req.body.taskName,
    category: req.body.category,
    label: req.body.label,
    description: req.body.description,
    difficulty: req.body.difficulty,
    deadline: req.body.deadline
  }

  try {
    const response = await TaskModel.createTask(task)
    if (!response.success) {
      return res.status(400).send(response)
    }
    res.status(201).send(response)
  } catch (error) {
    console.error(error)
    res
      .status(500)
    res.send({ success: false, error: 'Failed to create task.', result: null })
  }
}

module.exports = TaskController

// const TaskModel = require('../models/task.model')
// const TaskController = {}

// TaskController.create = async (req, res) => {
//   try {
//     const task = await TaskModel.createTask(req.body)
//     res.status(201).json(task)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ error: 'Internal Server Error' })
//   }
// }

// module.exports = TaskController
