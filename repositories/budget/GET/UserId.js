const budgetModel=require("../../../models/budget/budget")

async function UserId(userId){
    try{
        const Month=await budgetModel.find({
            userId:userId,
        })
        if(!Month){
            return `Cannot find the budget for the given user`
        }
        return Month
    }catch(error){
        throw new Error(`Error finding budget for the given user`)
    }
}

module.exports=UserId