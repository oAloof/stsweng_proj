const generalCalculator = {}

/**
 * Calculates the base exp of the task.
 *
 * @param {Object} user The current user.
 * @param {Object} difficulty The task's difficulty.
 * @returns The calculated exp for the task.
 */
generalCalculator.calculateExp = async (user, difficulty) => {
  let calculatedExp = 0

  // base exp
  switch (difficulty) {
    case 0.5:
      calculatedExp += 100
      break
    case 1.0:
      calculatedExp += 150
      break
    case 1.5:
      calculatedExp += 200
      break
    case 2.0:
      calculatedExp += 250
      break
    case 2.5:
      calculatedExp += 300
      break
    case 3.0:
      calculatedExp += 350
      break
    case 3.5:
      calculatedExp += 400
      break
    case 4.0:
      calculatedExp += 450
      break
    case 4.5:
      calculatedExp += 500
      break
    case 5.0:
      calculatedExp += 550
      break
  }

  // additional exp

  return calculatedExp
}

/**
 * Calculates the exp deduction due to editing a task.
 *
 * @param {Object} task the current task.
 * @param {Object} newtask the updated task.
 * @returns The updated exp for the task.
 */

generalCalculator.editDeduction = async (task, newtask) => {
  const currentExp = task.exp
  let updatedExp = 0

  const date1 = new Date(newtask.deadline)
  const date2 = new Date(task.deadline)

  if (date1 > date2) {
    updatedExp = currentExp * 0.95
  } else {
    updatedExp = currentExp
  }

  return updatedExp
}

/**
 * Calculates the exp deduction due to overdue task.
 *
 * @param {Object} task the current task.
 * @returns The updated exp for the task.
 */

generalCalculator.overdueDeduction = async (task) => {
  const currentExp = task.exp
  let updatedExp = 0

  const date1 = new Date(task.deadline)
  const date2 = new Date()

  if (date2 > date1) {
    const overdue = Math.round(
      date2.getTime() - date1.getTime() / (1000 * 3600 * 24)
    )
    updatedExp = currentExp - currentExp * 0.05 * overdue
  } else {
    updatedExp = currentExp
  }

  return updatedExp
}

/**
 * Calculates the added Exp due to finishing task in advance.
 *
 * @param {Object} task the current task.
 * @returns The updated exp for the task.
 */

generalCalculator.advanceAddition = async (task) => {
  const currentExp = task.exp
  let updatedExp = 0

  const date1 = new Date(task.deadline)
  const date2 = new Date()

  if (date2 > date1) {
    const advance = Math.round(
      date1.getTime() - date2.getTime() / (1000 * 3600 * 24)
    )
    updatedExp = currentExp + currentExp * 0.05 * advance
  } else {
    updatedExp = currentExp
  }

  return updatedExp
}

module.exports = generalCalculator
