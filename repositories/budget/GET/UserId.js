const budgetModel=require("../../../models/budget/budget")

async function UserId(userId) {
    try {
        const budgets = await budgetModel.find({
            userId: userId
        });

        if (budgets.length === 0) {
            return `No budgets found for the user with ID: ${userId}`;
        }
        return budgets;
    } catch (error) {
        throw new Error(`Error finding budgets for the user with ID: ${userId} - ${error.message}`);
    }
}

module.exports = UserId;
