const jwt = require("jsonwebtoken"); // Import JSON Web Token
const secretKey = process.env.SECRETKEY; // Replace with your actual secret key

const createToken=({userId,email})=>{
    return jwt.sign({userId:userId,email:email},secretKey,{
        expiresIn:"14d"
    })
}

const createTokenForPassword=({userId,email})=>{
    return jwt.sign({userId:userId,email:email},secretKey,{
        expiresIn:"1h"
    })
}

const authenticateToken=(token)=>{
return new Promise((resolve,reject)=>{
    jwt.verify(token,secretKey,(err,user)=>{
        if(err){
            reject(err)
        }else{
            resolve(user)
        }
    })    
})
}


module.exports={createToken,createTokenForPassword,authenticateToken}