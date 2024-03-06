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
 * Calculates the exp deduction due to editing a task.
 *
 * @param {Object} task the current task.
 * @param {Object} newtask the updated task.
 * @returns The updated exp for the task.
 */

generalCalculator.editDeduction = async (task, newtask) => {
  currentExp = task.exp 
  let date1 = new Date(newtask.deadline);
  let date2 = new Date(task.deadline);

  if (date1 > date2){
    updatedExp = currentExp*0.95
  } else {
    updatedExp = currentExp
  }

  return updatedExp;
}

/**
 * Calculates the exp deduction due to overdue task.
 *
 * @param {Object} task the current task.
 * @returns The updated exp for the task.
 */

 generalCalculator.overdueDeduction = async (task) => {
  currentExp = task.exp 
  let date1 = new Date(newtask.deadline);
  let date2 = new Date();

  if (date2 > date1){
    overdue = Math.round(date2.getTime() - date1.getTime() / (1000 * 3600 * 24));
    updatedExp = currentExp - currentExp * 0.05 * overdue
  } else {
    updatedExp = currentExp
  }

  return updatedExp;
}