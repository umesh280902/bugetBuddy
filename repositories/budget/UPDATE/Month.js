const budgetModel = require("../../../models/budget/budget");

async function updateByMonth(userId, month, year, updates) {
  return await budgetModel.findOneAndUpdate(
    { userId, Month: month, Year: year },
    { $set: updates },
    { new: true }
  );
}


module.exports = updateByMonth;
