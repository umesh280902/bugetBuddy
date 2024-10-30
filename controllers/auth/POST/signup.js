const { createToken } = require("../../../helpers/token/tokenHelper");
const userRepository=require("../../../repositories/Users/userRepository")
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
        const newUser = await UserRepository.createUser({
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
        });
  
        const token = createToken({ userId: newUser._id, email: newUser.email });
        return res.status(201).json({
          message: "User successfully created",
          token: token,
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  
  module.exports=signupPost