const BudgetRepository=require("../../../repositories/budget/budgetRepository")

async function Budget(req,res){
    try{
        const {budget}=req.body
        if(!budget){
            return res.status(400).json("Please provide budget")
        }
        const {userId}=req.user
        if(!userId){
            return res.status(401).json("Please login again")
        }

        const bud=await  BudgetRepository.Budget(userId,budget);
        if(bud){
            return res.status(200).json(bud)
        }     
    

    }catch(error){
        res.status(500).json("Internal Server Error")
    }
}

module.exports=Budget