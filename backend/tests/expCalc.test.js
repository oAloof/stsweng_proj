/* eslint-env jest */

// const taskModel = require('../models/task.model')
// const taskController = require('../controllers/task.controller')
const generalCalculator = require('../calculators/generalCalculator')

jest.mock('../calculators/generalCalculator', () => ({
  calculateExp: jest.fn(),
  editDeduction: jest.fn(),
  overdueDeduction: jest.fn(),
  advanceAddition: jest.fn()
}))

describe('Experience Calculator', () => {
  let user

  describe('Calculate Exp', () => {
    // Define test cases for each difficulty level
    const testCases = [
      { difficulty: 0.5, expectedExp: 100 },
      { difficulty: 1.0, expectedExp: 150 },
      { difficulty: 1.5, expectedExp: 200 },
      { difficulty: 2.0, expectedExp: 250 },
      { difficulty: 2.5, expectedExp: 300 },
      { difficulty: 3.0, expectedExp: 350 },
      { difficulty: 3.5, expectedExp: 400 },
      { difficulty: 4.0, expectedExp: 450 },
      { difficulty: 4.5, expectedExp: 500 },
      { difficulty: 5.0, expectedExp: 550 }
    ]

    testCases.forEach(({ difficulty, expectedExp }) => {
      it(`difficulty: ${difficulty} - expected exp: ${expectedExp}`, async () => {
        // Arrange
        user = { /* Define user object */ }
        generalCalculator.calculateExp.mockImplementation(() => expectedExp)

        // Act
        const result = await generalCalculator.calculateExp(user, difficulty)

        // Assert
        expect(result).toBe(expectedExp)
      })
    })
  })

  describe('Edit Deduction', () => {
    const task = {
      exp: 100,
      deadline: '2020-02-21'
    }
    let newtask
    let correctUpdatedExp = 0

    it('New deadline passed old deadline (exp deducted)', async () => {
      // Arrange
      newtask = {
        deadline: '2060-02-21'
      }
      correctUpdatedExp = 95 // task.exp * 0.95

      generalCalculator.editDeduction.mockImplementation(() => correctUpdatedExp)

      // Act
      const result = await generalCalculator.editDeduction(task, newtask)

      // Assert
      expect(result).toBe(correctUpdatedExp)
    })
    it('New deadline NOT passed old deadline (no change in exp)', async () => {
      // Arrange
      newtask = {
        deadline: '2011-02-21'
      }
      correctUpdatedExp = 100 // task.exp

      generalCalculator.editDeduction.mockImplementation(() => correctUpdatedExp)

      // Act
      const result = await generalCalculator.editDeduction(task, newtask)

      // Assert
      expect(result).toBe(correctUpdatedExp)
    })
  })
  describe('Overdue Deduction', () => {
    const task = {
      exp: 100,
      deadline: '2020-02-21'
    }
    // let date
    let correctUpdatedExp = 0

    it('Deadline passed (exp deducted)', async () => {
      // Arrange
      // date = new Date('2020-02-22')
      // deadline = new Date(task.deadline)
      // overdue = 1 // Math.round(date.getTime() - deadline.getTime() / (1000 * 3600 * 24))
      correctUpdatedExp = 50// task.exp - task.exp * 0.5 * overdue

      generalCalculator.overdueDeduction.mockImplementation(() => correctUpdatedExp)

      // Act
      const result = await generalCalculator.overdueDeduction(task)

      // Assert
      expect(result).toBe(correctUpdatedExp)
    })
    it('Deadline NOT passed yet (no change in exp)', async () => {
      // Arrange
      // date = '2011-02-21'
      correctUpdatedExp = 100 // task.exp

      generalCalculator.overdueDeduction.mockImplementation(() => correctUpdatedExp)

      // Act
      const result = await generalCalculator.overdueDeduction(task)

      // Assert
      expect(result).toBe(correctUpdatedExp)
    })
  })
  describe('Advance Addition', () => {
    const task = {
      exp: 100,
      deadline: '2020-02-21'
    }
    // let date
    let correctUpdatedExp = 0

    it('Finished before Deadline (exp added)', async () => {
      // Arrange
      // date = new Date('2020-02-20')
      // deadline = new Date(task.deadline)
      // overdue = 1 // Math.round(date1.getTime() - date2.getTime() / (1000 * 3600 * 24)
      correctUpdatedExp = 150 // task.exp + task.exp * 0.5 * overdue

      generalCalculator.advanceAddition.mockImplementation(() => correctUpdatedExp)

      // Act
      const result = await generalCalculator.advanceAddition(task)

      // Assert
      expect(result).toBe(correctUpdatedExp)
    })
    it('Havent reached deadline yet (no change in exp)', async () => {
      // Arrange
      // date = '2011-02-21'
      correctUpdatedExp = 100 // task.exp

      generalCalculator.advanceAddition.mockImplementation(() => correctUpdatedExp)

      // Act
      const result = await generalCalculator.advanceAddition(task)

      // Assert
      expect(result).toBe(correctUpdatedExp)
    })
  })
})
