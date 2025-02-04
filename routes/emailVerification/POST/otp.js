const express=require("express")
const verifyOtp=require("../../../controllers/emailVerification/otp")
const Router=express.Router()

Router.post("/otp",verifyOtp)

module.exports=Router;