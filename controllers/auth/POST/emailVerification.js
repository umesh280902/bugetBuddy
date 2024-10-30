// const emailVerification = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     if (!email || !otp) {
//       return res.status(400).json({ message: "Please provide email and OTP" });
//     }

//     const tempUser = tempUsersRepository.getTempUserByEmail(email);
//     if (!tempUser || tempUser.OTP !== otp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     const { firstName, lastName, password, phoneNumber } = tempUser;

//     const newUser = await UserRepository.createUser({
//       firstName,
//       lastName,
//       email,
//       password,
//       phoneNumber,
//     });

//     tempUsersRepository.deleteTempUser(email);

//     const token = createToken({ userId: newUser._id, email: newUser.email });

//     return res.status(201).json({
//       message: "User successfully created",
//       token: token,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
