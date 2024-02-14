const TaskModel = require('../models/task.model')
const TaskController = {}

/**
 * Creates a new task.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns The result of the operation, a success flag, and an error message if operation failed.
 * @async
 */
TaskController.create = async (req, res) => {
  // Parse the request body and extract the task properties into another object.
  const task = {
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

module.exports = TaskController
