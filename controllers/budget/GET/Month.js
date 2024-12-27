const BudgetRepository=require("../../../repositories/budget/budgetRepository")

async function Month(req,res){
    try{
        const {month,year}=req.body
        if(!month||!year){
            return res.status(400).json("Please provide month and year")
        }
        const {userId}=req.user
        if(!userId){
            return res.status(401).json("Please login again")
        }

        const mon=await  BudgetRepository.Month(userId,month,year);
        if(mon){
            return res.status(200).json(mon)
        }     
    

    }catch(error){
        res.status(500).json("Internal Server Error")
    }
}

module.exports=Month