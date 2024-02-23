// /* eslint-env jest */

// const TaskModel = require('../models/task.model')
// const TaskController = require('../controllers/task.controller')

// /* Task CRUD Tests
//     - create
//     - view
//     - edit
//     - delete
// */

// jest.mock('../models/task.model', () => ({
//   getTask: jest.fn(),
//   getTasks: jest.fn(),
//   createTask: jest.fn(),
//   updateTask: jest.fn(),
//   deleteTask: jest.fn()
// }))

// describe('Task Controller', () => {
//   const req = {
//     body: {},
//     flash: jest.fn(),
//     session: { user: 'Test Author' }
//   }

//   // const res = {
//   //   redirect: jest.fn(),
//   //   render: jest.fn(),
//   //   send: jest.fn(),
//   //   status: jest.fn(),
//   //   json: jest.fn()
//   // }
//   let res

//   beforeEach(() => {
//     res = {
//       redirect: jest.fn(),
//       render: jest.fn(),
//       send: jest.fn(),
//       status: jest.fn(),
//       json: jest.fn()
//     };
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   // const error = new Error({ error: 'Error message' })

//   // CREATE

//   describe('Create Task in Inbox', () => {
//     it('successfully created task', async () => {
//       // Arrange
//       const taskDetails = {
//         owner: 'sir roge',
//         taskName: 'sweng test cases',
//         category: 'sweng',
//         label: 'elp',
//         description: 'help',
//         difficulty: 'medium',
//         deadline: '2024-02-21'
//       }
//       req.body = taskDetails
//       // taskModel.createTask.mockResolvedValue((data, callback) => callback(null, data)) // simulate success
//       TaskModel.createTask.mockResolvedValue(taskDetails) // simulate success
//       // taskModel.createTask.mockResolvedValue({success: true, data: taskDetails})
//       // taskModel.createTask.mockImplementation((data, callback) => {
//       //   callback(null, { success: true, data });
//       // });

//       // Act
//       await TaskController.create(req, res)

//       // Assert
//       expect(TaskModel.createTask).toHaveBeenCalledWith(taskDetails)
//       expect(res.status).toHaveBeenCalledWith(201);
//       // expect(res.json).toHaveBeenCalledWith(taskDetails);
//       expect(res.send).toHaveBeenCalledWith({success: true, data: taskDetails})
//     })

//     it('failed to created task', async () => {
//       // Arrange
//       const errorResponse = {
//         success: false, error: 'Failed to get tasks.', result: null
//       }

//       // req.body = taskDetails
//       // taskModel.createTask.mockResolvedValue((data, callback) => callback(error, data)) // simulate failure
//       // taskModel.createTask.mockRejectedValue(errorResponse) // simulate failure
//       TaskModel.createTask.mockRejectedValue(errorResponse)
//       // taskModel.createTask.mockImplementation((data, callback) => {
//       //   callback(errorResponse, null);
//       // });

//       // Act
//       await TaskController.create(req, res)

//       // Assert
//       expect(TaskModel.createTask).toHaveBeenCalledWith(req.body)
//       expect(res.status).toHaveBeenCalledWith(500)
//       expect(res.send).toHaveBeenCalledWith({success: false, data: errorResponse})
//       // expect(res.json).toHaveBeenCalledWith(errorResponse);
//     })
//   })

//   // // VIEW ALL
//   //   describe('View Task in Inbox', () => {
//   //     it('succesfully viewed all tasks', async () => {
//   //       // Arrange
//   //     const taskDetails = {
//   //       owner: 'sir roge',
//   //       taskName: 'sweng test cases',
//   //       category: 'sweng',
//   //       label: 'elp',
//   //       description: 'help',
//   //       difficulty: 'medium',
//   //       deadline: '2024-02-21'
//   //     }
//   //     req.body = taskDetails
//   //     taskModel.getTasks.mockImplementation((data, callback) => callback(null, data)) // simulate success

//   //     // Act
//   //     await taskController.create(req, res)

//   //     // Assert
//   //     expect(taskModel.getTasks).toHaveBeenCalledWith(taskDetails)
//   //     })

//   //     it('failed to view all tasks', () => {})
//   //   })

//   // // EDIT
//   //   describe('Edit Task in Inbox', () => {
//   //     it('successfully edited a task', () => {})
//   //     it('failed to edit a task', () => {})
//   //   })

//   // // DELETE
//   // describe('Delete Task in Inbox', () => {
//   //   it('successfully deleted task', () => {})
//   //   it('failed to delete task', () => {})
//   //   })
// })
