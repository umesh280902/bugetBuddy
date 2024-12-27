const budgetModel=require("../../../models/budget/budget")

async function setBudget(budget){
    try{
        const newBudget=new budgetModel(budget);
        const savedBudget=await newBudget.save();
        return savedBudget
    }catch(error){
        throw new Error(`Error setting transaction: ${error.message}`);
    }
}

module.exports=setBudget