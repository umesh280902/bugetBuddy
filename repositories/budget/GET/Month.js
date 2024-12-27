const budgetModel=require("../../../models/budget/budget")

async function Month(userId,month,year){
    try{
        const Month=await budgetModel.findOne({
            userId:userId,
            Month:month,
            Year:year
        })
        if(!Month){
            return `Cannot find the budget for the month ${month} and year ${year}`
        }
        return Month
    }catch(error){
        throw new Error(`Error finding budget for the month ${month} and year ${year}`)
    }
}

module.exports=Month