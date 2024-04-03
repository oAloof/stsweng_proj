const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'Users' },
    taskName: { type: String },
    category: { type: String },
    label: [String],
    description: { type: String },
    difficulty: {
      type: Number,
      enum: [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0],
      default: 0.5,
      required: true
    },
    exp: { type: Number },
    deadline: { type: Date },
    status: {
      type: String,
      enum: ['PLANNING', 'TODO', 'ONGOING', 'COMPLETED', 'DELAYED'],
      default: 'PLANNING',
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Task = mongoose.model('Tasks', taskSchema)

/**
 * Retrieves all tasks of user.
 *
 * @param {String} userId The user ID.
 * @returns The tasks of the user.
 */
exports.getTasks = async (userId) => {
  try {
    const tasks = await Task.find({ owner: userId })
    return { success: true, result: tasks }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'Failed to get tasks.', result: null }
  }
}

/**
 * Retrieves one task based on its ID
 *
 * @param {String} taskId The task Id.
 * @returns The task with the specific task Id.
 */
exports.getTaskById = async (taskId) => {
  try {
    const tasks = await Task.findById(taskId)
    if (!tasks) {
      return { success: false, error: 'Task not found.', result: null }
    }
    return { success: true, result: tasks }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'Failed to get task.', result: null }
  }
}

/**
 * Creates a new task.
 *
 * @param {Object} obj The task object, containing properties like 'title', 'description', and 'status'.
 * @returns The result of the operation, a success flag, and an error message if operation failed.
 */
exports.createTask = async (obj) => {
  const task = new Task(obj)
  try {
    const result = await task.save()
    return { success: true, result }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'Failed to create task.', result: null }
  }
}

/**
 * Updates an existing task.
 *
 * @param {Object} obj The task object, containing properties like 'title', 'description', and 'status'.
 * @returns The result of the operation, a success flag, and an error message if operation failed.
 */
exports.updateTask = async (task) => {
  try {
    const result = await Task.findByIdAndUpdate(task._id, task, { new: true })
    return { success: true, result }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'Failed to update task.', result: null }
  }
}

/**
 * Deletes one task based on its ID
 *
 * @param {String} taskId The task Id.
 * @returns The task with the specific task Id.
 */
exports.deleteTask = async (taskId) => {
  try {
    const tasks = await Task.findByIdAndRemove(taskId)
    return { success: true, result: tasks }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'Failed to delete task.', result: null }
  }
}

/**
 * Sorts tasks based on a variable
 *
 * @param {String} query The variables to be sorted by
 * @returns The task with the specific task Id.
 */
exports.sortTasks = async (query) => {
  try {
    const tasks = await Task.find({}).sort(query)
    return { success: true, result: tasks }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'Failed to sort tasks by.' + query, result: null }
  }
}

/**
 * Finds tasks based on a variable/s
 *
 * @param {Array} query The variables to be sorted by: [Category, [Labels]]
 * @returns The task with the specific task Id.
 */
exports.getSpecificTasks = async (query) => {
  let tasks

  try {
    if (query.length > 1) {
      tasks = await Task.find({ category: query[0], label: query[1] })
    } else {
      tasks = await Task.find({ category: query[0] })
    }
    return { success: true, result: tasks }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'Failed to sort tasks by.' + query, result: null }
  }
}
