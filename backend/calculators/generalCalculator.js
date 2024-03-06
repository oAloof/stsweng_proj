const generalCalculator = {}

/**
 * Calculates the base exp of the task.
 *
 * @param {Object} user The current user.
 * @param {Object} difficulty The task's difficulty.
 * @returns The calculated exp for the task.
 */
 generalCalculator.calculateExp = async (user, difficulty) => {
  calculatedExp = 0 

  // base exp
  switch(task.exp) {
    case easy:
      calculateExp += 100
      break;
    case medium:
      calculateExp += 300
      break;
    case hard:
      calculateExp += 500
      break;
  }

  // additional exp

  return calculatedExp;
}

/**
 * Calculates the base exp of the task.
 *
 * @param {Object} user The current user.
 * @param {Object} difficulty The task's difficulty.
 * @returns The calculated exp for the task.
 */
generalCalculator.calculateExpDeduction = async (task, ) => {
  calculatedExp = 0 

  // base exp
  switch(task.exp) {
    case easy:
      calculateExp += 100
      break;
    case medium:
      calculateExp += 300
      break;
    case hard:
      calculateExp += 500
      break;
  }

  // additional exp
  
  return calculatedExp;
}