const express=require("express")
const Router=express.Router()
const BudgetController=require("../../../controllers/budget/budget")

Router.post("/",BudgetController.setBudget)

module.exports=Router