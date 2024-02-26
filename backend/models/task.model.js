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
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'easy',
      required: true
    },
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

exports.getTask = (id) => {}

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

exports.updateTask = (id, obj) => {}

exports.deleteTask = (id) => {}
