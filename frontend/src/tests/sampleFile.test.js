/* eslint-env jest */
const { render, screen } = require('@testing-library/react');
const { TasksProvider } = require('../contexts/TasksContext')

describe('Task Context', () => {
  // const jwtToken = localStorage.getItem('token')
  
  // FETCH ALL TASKS
  describe('Fetch All Tasks', () => {
    it('failure: fetch response not ok', async () => {
      // Arrange
      // Here you can mock the fetch API to simulate an error response
      // global.fetch = jest.fn(() => Promise.resolve({ ok: false, status: 500 }));

      // Act
      // await tasksProvider.findByTestId('fetch-tasks'); // Assuming you have a test ID for fetching tasks
      await TasksProvider.fetchAllTasks()

      // Assert
      // Assert the expected behavior after fetch failure
    });
  });

  // // CREATE TASK
  // describe('Create Task', () => {
  //   it('creates a task successfully', async () => {
  //     // Arrange
  //     // Mock necessary data and actions
  //     const task = { /* mock task object */ };

  //     // Act
  //     // Simulate creating a task
  //     await tasksProvider.createTask(task);

  //     // Assert
  //     // Assert the expected behavior after task creation
  //   });
  // });

  // // UPDATE TASK
  // describe('Update Task', () => {
  //   it('updates a task successfully', async () => {
  //     // Arrange
  //     // Mock necessary data and actions
  //     const task = { /* mock task object */ };

  //     // Act
  //     // Simulate updating a task
  //     await tasksProvider.updateTask(task);

  //     // Assert
  //     // Assert the expected behavior after task update
  //   });
  // });

  // // DELETE TASK
  // describe('Delete Task', () => {
  //   it('deletes a task successfully', async () => {
  //     // Arrange
  //     // Mock necessary data and actions
  //     const task = { /* mock task object */ };

  //     // Act
  //     // Simulate deleting a task
  //     await tasksProvider.deleteTask(task);

  //     // Assert
  //     // Assert the expected behavior after task deletion
  //   });
  // });

  // // GET ALL ONGOING TASKS
  // describe('getAllOngoingTasks', () => {
  //   it('returns ongoing tasks correctly', () => {
  //     // Assert
  //     const tasks = [
  //       { id: 1, status: 'PLANNING' },
  //       { id: 2, status: 'PLANNING' },
  //       { id: 3, status: 'COMPLETED' },
  //       { id: 4, status: 'PLANNING' },
  //       { id: 5, status: 'COMPLETED' },
  //     ];
  
  //     // Mock setOngoingTasks function
  //     const setOngoingTasks = jest.fn();
  
  //     // Call the function with mocked data
  //     getAllOngoingTasks(tasks, setOngoingTasks);
  
  //     // Define expected result
  //     const expectedOngoingTasks = [
  //       { id: 1, status: 'PLANNING' },
  //       { id: 2, status: 'PLANNING' },
  //       { id: 4, status: 'PLANNING' }
  //     ];
  
  //     // Verify if setOngoingTasks is called with the expected result
  //     expect(setOngoingTasks).toHaveBeenCalledWith(expectedOngoingTasks);
  //   });
  // });
});
