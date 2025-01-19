const budgetFactory=require("../factories/budget/budgetFactory")
const BudgetRepository=require("../repositories/budget/budgetRepository")

const createDummyBudgets=async (n)=>{
    await BudgetRepository.allBudgets();
    const promises=[]
    for(let i=0;i<n;i++){
        promises.push(budgetFactory());
    }

    await Promise.all(promises);
    console.log(`${n} budgets has created`)
}

module.exports=createDummyBudgets;