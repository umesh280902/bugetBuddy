const changePassword=require("./POST/changePassword")
const loginPost=require("./POST/login")
const logout=require("./POST/logout")
const resetPasswordToken=require("./POST/resetPasswordToken")
const signupPost=require("./POST/signup")

class auth{
    
    async loginPost(req,res){
        return await loginPost(req,res)
    }

    async signupPost(req,res){
        return await signupPost(req,res)
    }

    async changePassword(req,res){
        return await changePassword(req,res)
    }

    async resetPasswordToken(req,res){
        return await resetPasswordToken(req,res)
    }
    async logout(req,res){
        return await logout(req,res)
    }
}

module.exports=new auth()