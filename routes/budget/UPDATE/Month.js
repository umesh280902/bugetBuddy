const express=require("express")
const Router=express.Router()
const BudgetController=require("../../../controllers/budget/budget")

Router.put("/",BudgetController.updateByMonth)

module.exports=Router