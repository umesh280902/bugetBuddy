const deleteByMonth = require("./DELETE/Month");
const updateByMonth = require("./UPDATE/Month");
const Month = require("./GET/Month");
const Budget = require("./GET/Budget");
const UserId = require("./GET/UserId");
const Year = require("./GET/Year");
const setBudget = require("./POST/setBudget");
const allBudgets=require("./DELETE/All.js")

class BudgetRepository {
  async setBudget(budget) {
    return await setBudget(budget);
  }

  async Budget(userId, budget) {
    return await Budget(userId, budget);
  }

  async Month(userId, month, year) {
    return await Month(userId, month, year);
  }
  async UserId(userId) {
    return await UserId(userId);
  }
  async Year(userId, year) {
    return await Year(userId, year);
  }

  async updateByMonth(userId, month, year, budget) {
    return await updateByMonth(userId, month, year, budget);
  }
  async deleteByMonth(userId, month, year) {
    return await deleteByMonth(userId, month, year);
  }

  async allBudgets(){
    return await allBudgets();
  }
}

module.exports = new BudgetRepository();
