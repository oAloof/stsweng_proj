const TaskModel = require('../models/task.model')
const expCalc = require('../calculators/generalCalculator')
const TaskController = {}

/**
 * Retrieves all tasks of user. This is a protected route, so the user must be
 * authenticated to access it.
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
 * Retrieves one task based on its ID
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns The task with the specific task ID
 */
TaskController.getOneTask = async (req, res) => {
  try {
    const response = await TaskModel.getTaskById(req.body.taskId)
    if (!response.success) {
      return res.status(400).send(response)
    }
    res.status(200).send(response)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ success: false, error: 'Failed to get task.', result: null })
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
  const exp = await expCalc.calculateExp(req.user, req.body.difficulty)
  // Parse the request body and extract the task properties into another object.
  const task = {
    owner: req.user.id,
    taskName: req.body.taskName,
    category: req.body.category,
    label: req.body.label,
    description: req.body.description,
    difficulty: req.body.difficulty,
    exp,
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

/**
 * Updates an existing task.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns The result of the operation, a success flag, and an error message if operation failed.
 */
TaskController.update = async (req, res) => {
  // Parse the request body and extract the task properties into another object.
  const task = {
    _id: req.body._id,
    owner: req.user._id,
    taskName: req.body.taskName,
    category: req.body.category,
    label: req.body.label,
    description: req.body.description,
    difficulty: req.body.difficulty,
    exp: await expCalc.calculateExp(req.user, req.body.difficulty),
    deadline: req.body.deadline
  }

  try {
    const response = await TaskModel.updateTask(task)
    if (!response.success) {
      return res.status(400).send(response)
    }
    res.status(201).send(response)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ success: false, error: 'Failed to update task.', result: null })
  }
}

/**
 * Deletes one task based on its ID
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns The task deleted.
 */
TaskController.delete = async (req, res) => {
  try {
    const response = await TaskModel.deleteTask(req.body._id)
    if (!response.success) {
      return res.status(400).send(response)
    }
    res.status(200).send(response)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ success: false, error: 'Failed to delete task.', result: null })
  }
}

module.exports = TaskController
