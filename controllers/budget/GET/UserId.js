const BudgetRepository=require("../../../repositories/budget/budgetRepository")

async function UserId(req,res){
    try{
        const {userId}=req.user
        if(!userId){
            return res.status(401).json("Please login again")
        }

        const user=await  BudgetRepository.UserId(userId);
        if(user){
            return res.status(200).json(user)
        }     
    

    }catch(error){
        res.status(500).json("Internal Server Error")
    }
}

module.exports=UserId