const budgetFactory = require("../factories/budget/budgetFactory");
const BudgetRepository = require("../repositories/budget/budgetRepository");

const createDummyBudgets = async (n) => {
  const existingBudgets = await BudgetRepository.allBudgets();

  const promises = [];
  for (let i = 0; i < n; i++) {
    promises.push(budgetFactory());
  }

  await Promise.all(promises);
  console.log(`${n} budgets have been created`);
};

module.exports = createDummyBudgets;
