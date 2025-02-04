var express=require("express")
var Router=express.Router();
var auth=require("../../controllers/auth/auth")

Router.post("/login",auth.loginPost)
Router.post("/reset-password-token",auth.resetPasswordToken)
Router.post("/signup",auth.signupPost) 
Router.post("/change-password",auth.changePassword)
Router.post("/logout",auth.logout)

module.exports=Router