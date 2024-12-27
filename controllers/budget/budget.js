const deleteByMonth = require("./DELETE/Month");
const updateByMonth = require("./UPDATE/Month");
const setBudget = require("./POST/SetBudget");
const Year = require("./GET/Year");
const UserId = require("./GET/UserId");
const Month = require("./GET/Month");
const Budget = require("./GET/Budget");

class BudgetController {
  async deleteByMonth(req, res) {
    return await deleteByMonth(req, res);
  }
  async updateByMonth(req, res) {
    return await updateByMonth(req, res);
  }
  async setBudget(req, res) {
    return await setBudget(req, res);
  }
  async Year(req, res) {
    return await Year(req, res);
  }
  async UserId(req, res) {
    return await UserId(req, res);
  }
  async Month(req, res) {
    return await Month(req, res);
  }
  async Budget(req, res) {
    return await Budget(req, res);
  }
}

module.exports=new BudgetController();