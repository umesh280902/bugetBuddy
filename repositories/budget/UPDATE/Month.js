const budgetModel=require("../../../models/budget/budget")

async function updateByMonth(userId,month,year,budget){
    try{
        const Month=await budgetModel.findOneAndUpdate({
            userId:userId,
            Month:month,
            Year:year,
            Budget:budget
        })
        if(!Month){
            return `Cannot updating the budget for the month ${month} and year ${year}`
        }
        return Month
    }catch(error){
        throw new Error(`Error updating budget for the month ${month} and year ${year}`)
    }
}

module.exports=updateByMonth