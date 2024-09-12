var express=require("express")
var {
    signupPost,
    loginPost,
    emailVerification,
    changePassword,
    logout,
}=require("../controllers/authController")
var Router=express.Router();

Router.post("/login",loginPost)
Router.post("/email-verification",emailVerification)
Router.post("/signup",signupPost)
Router.post("/change-password",changePassword)
Router.post("/logout",logout)

module.exports=Router