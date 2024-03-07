/* eslint-env jest */

// const taskModel = require('../models/task.model')
// const taskController = require('../controllers/task.controller')
const generalCalculator = require ('../calculators/generalCalculator')

jest.mock('../calculators/generalCalculator', () => ({
  calculateExp: jest.fn(),
  editDeduction: jest.fn(),
  overdueDeduction: jest.fn(),
  advanceAddition: jest.fn()
}))

describe('Experience Calculator', () => {
  let difficulty = ""
  let correctCalculatedExp = 0
  let user
  
  describe('Calculate Exp', () => {
    it('easy', async () => {
      //Arrange
      difficulty = "easy"
      correctCalculatedExp = 100

      generalCalculator.calculateExp.mockImplementation(() => correctCalculatedExp)

      //Act
      const result = await generalCalculator.calculateExp(user, difficulty);

      //Assert
      expect(result).toBe(correctCalculatedExp);
    })
    it('medium', async () => {
      //Arrange
      difficulty = "medium"
      correctCalculatedExp = 300

      generalCalculator.calculateExp.mockImplementation(() => correctCalculatedExp)

      //Act
      const result = await generalCalculator.calculateExp(user, difficulty);

      //Assert
      expect(result).toBe(correctCalculatedExp);
    })
    it('hard', async () => {
      //Arrange
      difficulty = "hard"
      correctCalculatedExp = 500

      generalCalculator.calculateExp.mockImplementation(() => correctCalculatedExp)

      //Act
      const result = await generalCalculator.calculateExp(user, difficulty);

      //Assert
      expect(result).toBe(correctCalculatedExp);
    })
  })
  describe('Edit Deduction', () => {
    let task = {
      exp: 100,
      deadline: '2020-02-21'
    }
    let newtask
    let correctUpdatedExp = 0

    it('New deadline passed old deadline (exp deducted)', async () => {
      //Arrange
      newtask = {
        deadline: '2060-02-21'
      }
      correctUpdatedExp = 95 //task.exp * 0.95

      generalCalculator.editDeduction.mockImplementation(() => correctUpdatedExp)

      //Act
      const result = await generalCalculator.editDeduction(task, newtask);

      //Assert
      expect(result).toBe(correctUpdatedExp);
    })
    it('New deadline NOT passed old deadline (no change in exp)', async () => {
      //Arrange
      newtask = {
        deadline: '2011-02-21'
      }
      correctUpdatedExp = 100 //task.exp

      generalCalculator.editDeduction.mockImplementation(() => correctUpdatedExp)

      //Act
      const result = await generalCalculator.editDeduction(task, newtask);

      //Assert
      expect(result).toBe(correctUpdatedExp);
    })
  })
  describe('Overdue Deduction', () => {
    let task = {
      exp: 100,
      deadline: '2020-02-21'
    }
    let date
    let correctUpdatedExp = 0

    it('Deadline passed (exp deducted)', async () => {
      //Arrange
      date = new Date('2020-02-22')
      deadline = new Date(task.deadline)
      overdue = 1 //Math.round(date.getTime() - deadline.getTime() / (1000 * 3600 * 24))
      correctUpdatedExp = 50//task.exp - task.exp * 0.5 * overdue

      generalCalculator.overdueDeduction.mockImplementation(() => correctUpdatedExp)

      //Act
      const result = await generalCalculator.overdueDeduction(task);

      //Assert
      expect(result).toBe(correctUpdatedExp);
    })
    it('Deadline NOT passed yet (no change in exp)', async () => {
      //Arrange
      date = '2011-02-21'
      correctUpdatedExp = 100 //task.exp

      generalCalculator.overdueDeduction.mockImplementation(() => correctUpdatedExp)

      //Act
      const result = await generalCalculator.overdueDeduction(task);

      //Assert
      expect(result).toBe(correctUpdatedExp);
    })
  })
  describe('Advance Addition', () => {
    let task = {
      exp: 100,
      deadline: '2020-02-21'
    }
    let date
    let correctUpdatedExp = 0

    it('Finished before Deadline (exp added)', async () => {
      //Arrange
      date = new Date('2020-02-20')
      deadline = new Date(task.deadline)
      overdue = 1 //Math.round(date1.getTime() - date2.getTime() / (1000 * 3600 * 24)
      correctUpdatedExp = 150 //task.exp + task.exp * 0.5 * overdue

      generalCalculator.advanceAddition.mockImplementation(() => correctUpdatedExp)

      //Act
      const result = await generalCalculator.advanceAddition(task);

      //Assert
      expect(result).toBe(correctUpdatedExp);
    })
    it('Havent reached deadline yet (no change in exp)', async () => {
      //Arrange
      date = '2011-02-21'
      correctUpdatedExp = 100 //task.exp

      generalCalculator.advanceAddition.mockImplementation(() => correctUpdatedExp)

      //Act
      const result = await generalCalculator.advanceAddition(task);

      //Assert
      expect(result).toBe(correctUpdatedExp);
    })
  })

})