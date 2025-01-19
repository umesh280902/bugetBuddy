const budgetModel=require("../../../models/budget/budget")
async function allBudgets(){
    try{
        await budgetModel.deleteMany()
        console.log("budget deleted")
    }catch(error){
        throw new Error(`Error deleting budgets: ${error.message}`);
    }
}


module.exports=allBudgets