const budgetModel=require("../../../models/budget/budget")

async function Month(userId, month, year) {
    try {
        const budget = await budgetModel.findOne({
            userId: userId,
            Month: month,
            Year: year
        });
        return budget||null;
    } catch (error) {
        throw new Error(`Error finding budget for the month: ${month} and year: ${year} - ${error.message}`);
    }
}

module.exports = Month;
