const BudgetRepository=require("../../../repositories/budget/budgetRepository")

async function deleteByMonth(req,res){
    try{
        const {month,year}=req.body
        const {userId}=req.user
        if(!userId){
            return res.status(401).json("Please login again")
        }

        const del=await  BudgetRepository.deleteByMonth(userId,month,year);
        if(del){
            return res.status(200).json(`Budget deleted successfully for the month ${month} and year ${year}`)
        }     
    

    }catch(error){
        res.status(500).json("Internal Server Error")
    }
}

module.exports=deleteByMonth