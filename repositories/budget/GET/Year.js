const budgetModel=require("../../../models/budget/budget")

async function Year(userId,year){
    try{
        const Month=await budgetModel.find({
            userId:userId,
            Year:year
        })
        if(!Month){
            return `Cannot find the budget for the year ${year}`
        }
        return Month
    }catch(error){
        throw new Error(`Error finding budget for the year ${year}`)
    }
}

module.exports=Year