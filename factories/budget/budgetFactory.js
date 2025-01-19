const BudgetRepository = require("../../repositories/budget/budgetRepository");
const { faker } = require("@faker-js/faker");
const getRandomUserId = require("../transactions/userId");
const generateBudget=require("./generateBudget")
const budgetFactory = async () => {
    const budget = {
        userId: await getRandomUserId(),
        Budget: generateBudget(20000,100000,2),// Generate a budget between 1000 and 10000 with 2 decimal places
        Month: faker.date.month(), // Generate a random month
        Year: faker.date.past(10).getFullYear(), // Generate a random year within the past 10 years
    };
    console.log("Budget generated is as follows:",budget.Budget)
    await BudgetRepository.setBudget(budget)

};

module.exports = budgetFactory;
