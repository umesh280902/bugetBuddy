const createUser=require("./POST/createUser")
const Email=require("./GET/email")
const PhoneNumber=require("./GET/email")
const UserById=require("./GET/userId")
const deleteUser=require("./DELETE/deleteUser")
const updatePassword=require("./UPDATE/updatePassword")
class userRepository {
    async createUser(user){
        return await createUser(user)
    }

    async Email(email){
        return await Email(email)
    }

    async PhoneNumber (phoneNumber){
        return await PhoneNumber (phoneNumber)
    }

    async UserById(userId){
        return await UserById(userId)
    }

    async updatePassword(userId, newPassword){
        return await updatePassword(userId, newPassword)
    }

    async deleteUser(userId){
        return await deleteUser(userId)
    }
}

module.exports = userRepository;
