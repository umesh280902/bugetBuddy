const budgetModel=require("../../../models/budget/budget")

async function Year(userId, year) {
    try {
        const budgets = await budgetModel.find({
            userId: userId,
            Year: year
        });

        if (budgets.length === 0) {
            return `No budgets found for the year: ${year}`;
        }
        return budgets;
    } catch (error) {
        throw new Error(`Error finding budgets for the year: ${year} - ${error.message}`);
    }
}

module.exports = Year;

