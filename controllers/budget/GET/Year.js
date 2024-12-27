const BudgetRepository=require("../../../repositories/budget/budgetRepository")

async function Year(req,res){
    try{
        const {year}=req.body
        if(!year){
            return res.status(400).json("Please provide year")
        }
        const {userId}=req.user
        if(!userId){
            return res.status(401).json("Please login again")
        }

        const yr=await  BudgetRepository.Year(userId,year);
        if(yr){
            return res.status(200).json(yr)
        }     
    

    }catch(error){
        res.status(500).json("Internal Server Error")
    }
}

module.exports=Year