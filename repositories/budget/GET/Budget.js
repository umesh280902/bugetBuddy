const budgetModel=require("../../../models/budget/budget")

async function Budget(userId,budget){
    try{
        const Month=await budgetModel.find({
            userId:userId,
            Budget:budget
        })
        if(!Month){
            return `Cannot find the budget for the budget ${budget}`
        }
        return Month
    }catch(error){
        throw new Error(`Error finding budget for the budget ${budget}`)
    }
}

module.exports=Budget