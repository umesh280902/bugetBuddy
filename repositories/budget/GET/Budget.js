const budgetModel=require("../../../models/budget/budget")

async function Budget(userId, budget) {
    try {
        const budgets = await budgetModel.find({
            userId: userId,
            Budget: budget
        });

        if (budgets.length === 0) {
            return `No budgets found with the specified amount: ${budget}`;
        }
        return budgets;
    } catch (error) {
        throw new Error(`Error finding budgets with the specified amount: ${budget} - ${error.message}`);
    }
}

module.exports = Budget;
