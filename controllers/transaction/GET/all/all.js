const categorySorted = require("./categorysorted");
const category = require("./category");
const RecentTransaction = require("./recentTransactions");
const MonthSum = require("./monthsum");
const Amount = require("./amount");
const allTransaction = require("./allTransactions");
const categoryMonthSum = require("./categoryMonthSum");
const credit = require("./credit");
const debit = require("./debit");
const creditMonthSum=require("./creditMonthSum")
const debitMonthSum=require("./debitMonthSum")
class All {
  async allTransaction(req, res, next) {
    return await allTransaction(req, res, next);
  }

  async categoryMonthSum(req, res, next) {
    return await categoryMonthSum(req, res, next);
  }

  async Amount(req, res, next) {
    return await Amount(req, res, next);
  }

  async category(req, res, next) {
    return await category(req, res, next);
  }

  async categorySorted(req, res, next) {
    return await categorySorted(req, res, next);
  }

  async RecentTransaction(req, res, next) {
    return await RecentTransaction(req, res, next);
  }

  async MonthSum(req, res, next) {
    return await MonthSum(req, res, next);
  }

  async credit(req, res, next) {
    return await credit(req, res, next);
  }

  async debit(req, res, next) {
    return await debit(req, res, next);
  }

  async creditMonthSum(req,res,next){
    return await creditMonthSum(req,res,next)
  }

  async debitMonthSum(req,res,next){
    return await debitMonthSum(req,res,next);
  }

}

module.exports = All;
