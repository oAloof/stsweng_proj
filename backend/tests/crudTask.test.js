// /* eslint-env jest */

// // const jest = require('jest')
// const taskModel = require('../models/task.model')
// const taskController = require('../controllers/task.controller')

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
//     flash: jest.fn()
//     // session: { user: 'Test Author' },
//   }

//   const res = {
//     redirect: jest.fn(),
//     render: jest.fn(),
//     send: jest.fn()
//     // status: jest.fn(),
//     // json: jest.fn(),
//   }

//   const error = new Error({ error: 'Error message' })

//   // CREATE
//   /* Feature: Create Task in Inbox

//     Scenario: User creates a task with all required details
//         Given the user is on the create task page
//         When the user enters the required details (Name, Category [Main Label], Difficulty, Deadline) and confirms
//         Then the task should be added to the inbox

//     Scenario: User creates a task without all required details
//         Given the user is on the create task page
//         When the user enters incomplete details and confirms
//         Then an error should be displayed indicating missing details

//     Scenario: User creates a task with optional details
//         Given the user is on the create task page
//         When the user enters all details including optional ones and confirms
//         Then the task should be added to the inbox

//     Scenario: Task immediately shows up in the inbox
//         Given the user is on the create task page
//         When the user creates a task
//         Then the task should immediately appear in the inbox as a tab
//     */
//   describe('Create Task in Inbox', () => {
//     it('created task with only title', async () => {
//       // Arrange
//       const taskDetails = {
//         taskName: 'sweng test cases'
//       }
//       req.body = taskDetails
//       taskModel.createTask.mockResolvedValue((data, callback) => callback(null, data)) // simulate success

//       // Act
//       await taskController.create(req, res)

//       // Assert
//       expect(taskModel.createTask).toHaveBeenCalledWith(taskDetails)
//     })

//     it('created task with additional optional details added to inbox', async () => {
//       // Arrange
//       const taskDetails = {
//         taskName: 'sweng test cases',
//         category: 'sweng',
//         difficulty: 'medium'
//       }
//       req.body = taskDetails
//       taskModel.createTask.mockResolvedValue((data, callback) => callback(null, data)) // simulate success

//       // Act
//       await taskController.create(req, res)

//       // Assert
//       expect(taskModel.createTask).toHaveBeenCalledWith(taskDetails)
//     })

//     it('created task with complete details added to inbox', async () => {
//       // Arrange
//       const taskDetails = {
//         taskName: 'sweng test cases',
//         category: 'sweng',
//         description: 'help',
//         difficulty: 'medium',
//         deadline: '2024-02-21'
//       }
//       req.body = taskDetails
//       taskModel.createTask.mockResolvedValue((data, callback) => callback(null, data)) // simulate success

//       // Act
//       await taskController.create(req, res)

//       // Assert
//       expect(taskModel.createTask).toHaveBeenCalledWith(taskDetails)
//       // expect(res.status).toHaveBeenCalledWith(201);
//       // expect(res.json).toHaveBeenCalledWith(taskDetails);
//     })

//     it('created task without title shows error msg', async () => {
//       // Arrange
//       const taskDetails = {
//         category: 'sweng',
//         description: 'help',
//         difficulty: 'medium',
//         deadline: '2024-02-21'
//       }
//       req.body = taskDetails
//       taskModel.createTask.mockResolvedValue((data, callback) => callback(error, data)) // simulate failure

//       // Act
//       await taskController.create(req, res)

//       // Assert
//       expect(taskModel.createTask).toHaveBeenCalledWith(taskDetails)
//     })

//     // idk about this one
//     // it('created task task immediately shows up in the inbox on create task', () => {
//     //   // Arrange
//     //   // Act
//     //   // Assert
//     // })
//   })

//   // NOT SURE IF ABLE TO IMPLEMENT TIS IN UNIT TEST?? PERO MMYA NA HEHE
//   // VIEW
//   /* Feature: View Task in Inbox

//     Scenario: User views a task by clicking on "view quest" option
//         Given there are tasks available in the inbox
//         When the user clicks on the "view quest" option for a specific task
//         Then the user should be able to view all details they inputted for that task

//     Scenario: All details are viewable, even if the field is empty
//         Given the user is viewing a task
//         When there are empty fields in the task details
//         Then all details should be displayed, including empty fields

//     Scenario: UI properly accounts for long inputs
//         Given the user is viewing a task
//         When a field contains a long string
//         Then the UI should properly wrap around and adjust elements accordingly

//     Scenario: User confirms that the task view looks good
//         Given the user is viewing a task
//         Then the user should confirm that the task view is visually appealing and meets the design expectations
//     */
//   //   describe('View Task in Inbox', () => {
//   //     it('views a task by clicking on "view quest" option', () => {})
//   //     it('all details are viewable, even if the field is empty', () => {})
//   //     it('UI properly accounts for long inputs', () => {})
//   //     it('task view looks good', () => {})
//   //   })

//   // EDIT
//   /* Feature: Edit Task in Inbox

//     Scenario: User edits a task by clicking on "edit quest" option
//         Given there are tasks available in the inbox
//         When the user clicks on the "edit quest" option for a specific task
//         Then the user should be able to edit all details they inputted for that task

//     Scenario: User attempts to leave the edit page without saving
//         Given the user is editing a task
//         When the user attempts to leave the edit page without pressing the save button
//         Then a popup should appear asking if the user wants to leave without saving

//     Scenario: User removes input or forgets to put a replacement input
//         Given the user is editing a task
//         When the user removes input or forgets to put a replacement input and attempts to save
//         Then the system should display an error message stating "Input is required in this portion"

//     Scenario: User saves changes after editing
//         Given the user is editing a task
//         When the user makes changes and clicks the save button
//         Then the changes should be saved, and the user can exit the edit page

//     Scenario: User successfully edits a task and exits
//         Given the user is editing a task
//         When the user makes changes, clicks the save button, and exits the edit page
//         Then the edited task details should be updated in the inbox
//     */
//   //   describe('Edit Task in Inbox', () => {
//   //     it('edits a task by clicking on "edit quest" option', () => {})
//   //     it('popup appears when attempt to leave the edit page without saving', () => {})
//   //     it('display an error msg when the user removes input without replacement', () => {})
//   //     it('changes saved and the user can exit the edit page on clicking save button', () => {})
//   //     it('edited task details should be updated in the inbox on success', () => {})
//   //   })

//   // DELETE
//   /* Feature: Delete Task in Inbox

//     Scenario: User deletes a task by clicking on "delete quest" option
//         Given there are tasks available in the inbox
//         When the user clicks on the "delete quest" option for a specific task
//         Then the user should be prompted if they are sure about deleting the quest

//     Scenario: User confirms deletion with a preview of the quest
//         Given the user is prompted for deletion confirmation
//         When the user confirms deletion
//         Then a preview of the quest with a short summary of the inputs given should be displayed

//     Scenario: User deletes a task, and the tab and data are removed
//         Given the user has confirmed deletion
//         When the user presses "yes" to delete the quest
//         Then the tab in the inbox should be deleted, and all data pertaining to it should be deleted from the inbox database

//     Scenario: User cancels the deletion
//         Given the user is prompted for deletion confirmation
//         When the user presses "no" to cancel the deletion
//         Then the quest should not be deleted, and the inbox state remains unchanged

//     Scenario: Multiple deletes at the same time (optional)
//         Given there are multiple tasks available in the inbox
//         When the user selects and confirms deletion for multiple tasks
//         Then all selected tasks should be deleted, and their respective tabs and data removed from the inbox database
//     */
// //   describe('Delete Task in Inbox', () => {
// //     it('prompted by clicking on "delete quest" option', () => {})
// //     it('', () => {})
// //     it('tab and data deleted on successful deletion', () => {})
// //     it('', () => {})
// //     it('(optional) respective tabs and data on multiple tasks deleted', () => {})
// //   })
// })
