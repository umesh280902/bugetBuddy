const express=require("express")
const Router=express.Router()
const authentication = require("../../middleware/authMiddleware");
const postRoutes=require("./POST/setBudget")
const getRoutes=require("./GET/Budget")
const putRoutes=require("./UPDATE/Month")
const deleteRoutes=require("./DELETE/Month")

Router.use(authentication)

Router.use("/",postRoutes)
Router.use("/",getRoutes)
Router.use("/",putRoutes)
Router.use("/",deleteRoutes)

module.exports=Router
