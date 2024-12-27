const express=require("express")
const Router=express.Router()
const BudgetController=require("../../../controllers/budget/budget")

Router.delete("/",BudgetController.deleteByMonth)

module.exports=Router