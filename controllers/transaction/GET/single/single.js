const getTransactions = require("./getTransactions");
const CategorySortedMonth = require("./categorysorted");
const CategoryMonth = require("./category");
const getExpenses = require("./totalsum");
const credit=require("./credit")
const debit=require("./debit")
class Single {
  async getExpenses(req, res, next) {
    return await getExpenses(req, res, next);
  }

  async getTransactions(req, res, next) {
    return await getTransactions(req, res, next);
  }

  async CategoryMonth(req, res, next) {
    return await CategoryMonth(req, res, next);
  }

  async CategorySortedMonth(req, res, next) {
    return await CategorySortedMonth(req, res, next);
  }

  async credit(req,res,next){
    return await credit(req,res,next)
  }
  
  async debit(req,res,next){
    return await debit(req,res,next)
  }
}

module.exports = Single;
