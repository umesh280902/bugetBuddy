const budgetModel=require("../../../models/budget/budget")

async function deleteByMonth(userId,month,year){
    try{
        const Month=await budgetModel.findOneAndDelete({
            userId:userId,
            Month:month,
            Year:year
        })
        if(!Month){
            return `Cannot deleting the budget for the month ${month} and year ${year}`
        }
        return Month
    }catch(error){
        throw new Error(`Error deleting budget for the month ${month} and year ${year}`)
    }
}

module.exports=deleteByMonth