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
  getTask: jest.fn(),
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
        _id: '1234567'
      }
      const taskDetails = {
        owner: '1234567',
        taskName: 'sweng test cases',
        category: 'sweng',
        label: 'elp',
        description: 'help',
        difficulty: 'medium',
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
        _id: '1234567'
      }
      const taskDetails = {
        owner: '1234567',
        taskName: 'sweng test cases',
        category: 'sweng',
        label: 'elp',
        description: 'help',
        difficulty: 'medium',
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
    })
  })

  // // VIEW ALL
  // describe('View Task in Inbox', () => {
  //   it('succesfully viewed all tasks', async () => {

  //   })

  //   it('failed to view all tasks', () => {})

  // })

  // // EDIT
  //   describe('Edit Task in Inbox', () => {
  //     it('success: EDIT Task', async () => {
  //       // Arrange
  //       const userDetails = {
  //         _id: '1234567'
  //       }
  //       const taskDetails = {
  //         owner: '1234567',
  //         taskName: 'sweng test cases',
  //         category: 'sweng',
  //         label: 'elp',
  //         description: 'help',
  //         difficulty: 'medium',
  //         deadline: '2024-02-21'
  //       }

  //       const success = { success: true, result: taskDetails }

  //       // req.user._id = taskDetails.owner
  //       req.user = userDetails
  //       req.body = taskDetails

  //       taskModel.updateTask.mockImplementation((id, taskDetails) => success) // Simulate success

  //       // Act
  //       await taskController.update(req, res)

  //       // Assert
  //       expect(taskModel.updateTask).toHaveBeenCalledWith((taskDetails.owner, taskDetails))
  //       expect(res.status(201).send).toHaveBeenCalledWith(success)
  //     })

  //     it('failure: EDIT task', async () => {
  //       // Arrange
  //       const userDetails = {
  //         _id: '1234567'
  //       }
  //       const taskDetails = {
  //         owner: '1234567',
  //         taskName: 'sweng test cases',
  //         category: 'sweng',
  //         label: 'elp',
  //         description: 'help',
  //         difficulty: 'medium',
  //         deadline: '2024-02-21'
  //       }

  //       // req.user._id = taskDetails.owner
  //       req.user = userDetails
  //       req.body = taskDetails

  //       const error = { success: false, error: 'Failed to edit task.', result: null }

  //       taskModel.updateTask.mockImplementation(() => error)

  //       // Act
  //       await taskController.update(req, res)

  //       // Assert
  //       expect(taskModel.updateTask).toHaveBeenCalledWith((taskDetails.owner, taskDetails))
  //       expect(res.status(500).send).toHaveBeenCalledWith(error)
  //     })
  //   })

// // DELETE
// describe('Delete Task in Inbox', () => {
//   it('successfully deleted task', () => {})
//   it('failed to delete task', () => {})
//   })
})
