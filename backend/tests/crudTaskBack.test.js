/* eslint-env jest */

const taskModel = require('../models/task.model')
const taskController = require('../controllers/task.controller')

/* Task CRUD Tests
    - create
    - view
    - edit
    - delete
*/

jest.mock('../models/task.model', () => ({
  getTaskById: jest.fn(),
  getTasks: jest.fn(),
  createTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn()
}))

describe('Task Controller', () => {
  const req = {
    body: {},
    flash: jest.fn(),
    session: { user: 'Test Author' }
  }

  const res = {
    redirect: jest.fn(),
    render: jest.fn(),
    send: jest.fn(),
    // status: jest.fn(),
    status: jest.fn().mockReturnValue({ send: jest.fn() }),
    json: jest.fn(),
    console: jest.fn(),
    error: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // CREATE TASK
  describe('Create Task in Inbox', () => {
    it('success: create Task', async () => {
      // Arrange
      const userDetails = {
        id: '1234567'
      }
      const taskDetails = {
        owner: '1234567',
        taskName: 'sweng test cases',
        category: 'sweng',
        label: 'elp',
        description: 'help',
        difficulty: 2.5,
        exp: 300,
        deadline: '2024-02-21'
      }

      const success = { success: true, result: taskDetails }

      // req.user._id = taskDetails.owner
      req.user = userDetails
      req.body = taskDetails

      taskModel.createTask.mockImplementation(taskDetails => success) // Simulate success

      // Act
      await taskController.create(req, res)

      // Assert
      expect(taskModel.createTask).toHaveBeenCalledWith(taskDetails)
      expect(res.status(201).send).toHaveBeenCalledWith(success)
    })

    it('failure: create task', async () => {
      // Arrange
      const userDetails = {
        id: '1234567'
      }
      const taskDetails = {
        owner: '1234567',
        taskName: 'sweng test cases',
        category: 'sweng',
        label: 'elp',
        description: 'help',
        difficulty: 2.5,
        exp: 300,
        deadline: '2024-02-21'
      }

      // req.user._id = taskDetails.owner
      req.user = userDetails
      req.body = taskDetails

      const error = { success: false, error: 'Failed to create task.', result: null }

      req.body = taskDetails

      taskModel.createTask.mockImplementation(() => error)

      // Act
      await taskController.create(req, res)

      // Assert
      expect(taskModel.createTask).toHaveBeenCalledWith(taskDetails)
      expect(res.status(500).send).toHaveBeenCalledWith(error)
      expect(res.status(400).send).toHaveBeenCalledWith(error)
    })
  })

  // VIEW ALL
  describe('View All Task in Inbox', () => {
    it('success: VIEW ALL Task', async () => {
      // Arrange
      const userDetails = {
        _id: 'asdf',
        userId: '1234567'
      }

      const tasks = [
        {
          owner: '1234567',
          taskName: '1 test cases',
          category: 'sweng',
          label: 'elp',
          description: 'help',
          difficulty: 4.5,
          deadline: '2024-02-21'
        },
        {
          owner: '1234567',
          taskName: '2 test cases',
          category: 'sweng',
          label: 'elp',
          description: 'help',
          difficulty: 4.5,
          deadline: '2024-02-21'
        },
        {
          owner: '1234567',
          taskName: '3 test cases',
          category: 'sweng',
          label: 'elp',
          description: 'help',
          difficulty: 4.5,
          deadline: '2024-02-21'
        },
        {
          owner: '1234567',
          taskName: '4 test cases',
          category: 'sweng',
          label: 'elp',
          description: 'help',
          difficulty: 4.5,
          deadline: '2024-02-21'
        }
      ]

      const success = { success: true, result: tasks }

      req.user._id = userDetails._id

      taskModel.getTasks.mockImplementation(() => success) // Simulate success

      // Act
      await taskController.getTasks(req, res)

      // Assert
      expect(taskModel.getTasks).toHaveBeenCalledWith(userDetails._id)
      expect(res.status(201).send).toHaveBeenCalledWith(success)
    })

    it('failure: VIEW ALL task', async () => {
      // Arrange
      const userDetails = {
        _id: 'asdf',
        userId: '1234567'
      }

      req.user._id = userDetails._id

      const error = { success: false, error: 'Failed to get tasks.', result: null }

      taskModel.getTasks.mockImplementation(() => error)

      // Act
      await taskController.getTasks(req, res)

      // Assert
      expect(taskModel.getTasks).toHaveBeenCalledWith(userDetails._id)
      expect(res.status(500).send).toHaveBeenCalledWith(error)
      expect(res.status(400).send).toHaveBeenCalledWith(error)
    })
  })

  // VIEW ALL
  describe('View One Task in Inbox', () => {
    it('success: VIEW ONE Task', async () => {
      // Arrange
      const taskDetails = {
        owner: '1234567',
        taskName: 'sweng test cases',
        category: 'sweng',
        label: 'elp',
        description: 'help',
        difficulty: 4.5,
        exp: 500,
        deadline: '2024-02-21'
      }

      const success = { success: true, result: taskDetails }

      const taskID = '978230ahsdfaosd'

      req.body.taskId = taskID

      taskModel.getTaskById.mockImplementation((id) => success) // Simulate success

      // Act
      await taskController.getOneTask(req, res)

      // Assert
      expect(taskModel.getTaskById).toHaveBeenCalledWith(taskID)
      expect(res.status(201).send).toHaveBeenCalledWith(success)
    })

    it('failure: VIEW ONE task', async () => {
      // Arrange

      const taskID = '978230ahsdfaosd'

      req.body.taskId = taskID

      const error = { success: false, error: 'Failed to get task.', result: null }

      taskModel.getTaskById.mockImplementation(() => error)

      // Act
      await taskController.getOneTask(req, res)

      // Assert
      expect(taskModel.getTaskById).toHaveBeenCalledWith(taskID)
      expect(res.status(500).send).toHaveBeenCalledWith(error)
      expect(res.status(400).send).toHaveBeenCalledWith(error)
    })
  })

  // EDIT
  describe('Edit Task in Inbox', () => {
    it('success: EDIT Task', async () => {
      // Arrange
      const userDetails = {
        _id: '1234567'
      }
      const taskDetails = {
        owner: '1234567',
        taskName: 'sweng test cases',
        category: 'sweng',
        label: 'elp',
        description: 'help',
        difficulty: 4.5,
        exp: 500,
        deadline: '2024-02-21'
      }

      const success = { success: true, result: taskDetails }

      req.user = userDetails
      req.body = taskDetails
      // req.body.taskId = taskID

      taskModel.updateTask.mockImplementation((taskDetails) => success) // Simulate success

      // Act
      await taskController.update(req, res)

      // Assert
      expect(taskModel.updateTask).toHaveBeenCalledWith(taskDetails)
      expect(res.status(201).send).toHaveBeenCalledWith(success)
    })

    it('failure: EDIT task', async () => {
      // Arrange
      const userDetails = {
        _id: '1234567'
      }
      const taskDetails = {
        owner: '1234567',
        taskName: 'sweng test cases',
        category: 'sweng',
        label: 'elp',
        description: 'help',
        difficulty: 4.5,
        exp: 500,
        deadline: '2024-02-21'
      }

      req.user = userDetails
      req.body = taskDetails
      // req.body.taskId = taskID

      const error = { success: false, error: 'Failed to edit task.', result: null }

      taskModel.updateTask.mockImplementation(() => error)

      // Act
      await taskController.update(req, res)

      // Assert
      expect(taskModel.updateTask).toHaveBeenCalledWith(taskDetails)
      expect(res.status(500).send).toHaveBeenCalledWith(error)
      expect(res.status(400).send).toHaveBeenCalledWith(error)
    })
  })

  // DELETE
  describe('Delete Task in Inbox', () => {
    it('success: DELETE Task', async () => {
    // Arrange
      const taskID = '978230ahsdfaosd'

      const success = { success: true }

      req.body._id = taskID

      taskModel.deleteTask.mockImplementation((id) => success) // Simulate success

      // Act
      await taskController.delete(req, res)

      // Assert
      expect(taskModel.deleteTask).toHaveBeenCalledWith(taskID)
      expect(res.status(201).send).toHaveBeenCalledWith(success)
    })

    it('failure: DELETE task', async () => {
    // Arrange
      const taskID = '978230ahsdfaosd'

      req.body._id = taskID

      const error = { success: false, error: 'Failed to delete task.', result: null }

      taskModel.deleteTask.mockImplementation(() => error)

      // Act
      await taskController.delete(req, res)

      // Assert
      expect(taskModel.deleteTask).toHaveBeenCalledWith(taskID)
      expect(res.status(500).send).toHaveBeenCalledWith(error)
      expect(res.status(400).send).toHaveBeenCalledWith(error)
    })
  })
})
