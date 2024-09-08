const jwt = require("jsonwebtoken"); // Import JSON Web Token
const secretKey = process.env.SECRETKEY; // Replace with your actual secret key

const createToken=({userId,email})=>{
    return jwt.sign({userId:userId,email:email},secretKey,{
        expiresIn:"14d"
    })
}

module.exports=createToken