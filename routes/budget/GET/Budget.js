const express=require("express")
const Router=express.Router()
const BudgetController=require("../../../controllers/budget/budget")

Router.get("/",BudgetController.Budget)
Router.get("/month",BudgetController.Month)
Router.get("/year",BudgetController.Year)
Router.get("/userId",BudgetController.UserId)

module.exports=Router