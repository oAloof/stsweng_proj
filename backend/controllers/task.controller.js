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
    const response = await TaskModel.getTasks(req.user._id) 
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
    owner: req.user._id,
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
      .send({ success: false, error: 'Failed to create task.', result: null })
  }
}

TaskController.update = async (req, res) => {}

TaskController.delete = async (req, res) => {}

module.exports = TaskController