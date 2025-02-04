const userRepository=require("../../../repositories/Users/userRepository")
const generateOTP=require("../../../helpers/otp/otpGenerator")
const sendMail=require("../../../helpers/mail/sendMail")
const tempUserRepository=require("../../../repositories/tempUser/tempUserRepository")
const { StatusCodes } = require("http-status-codes")
const UserRepository=new userRepository()
// Controller functions
const signupPost = async (req, res) => {
    try {
      const { firstName, lastName, email, password, phoneNumber } = req.body;
  
      if (!firstName || !lastName || !email || !password || !phoneNumber) {
        return res.status(400).json({ message: "Please fill all the details" });
      }
  
      const user = await UserRepository.Email(email)
      if (user) {
        return res.status(409).json({ message: "User already exists" });
      } else {
        const otp=generateOTP();
        const user={
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          otp
        }
        tempUserRepository.setTempUser(user);
        sendMail(email,"Otp for registration",`Hi ${firstName} ${lastName} your otp for the registration on Budget Buddy is as follow ${otp}`)
        return res.status(StatusCodes.OK).json({message:"Otp has been sent to your mail. Please check your email"})
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  
  module.exports=signupPost