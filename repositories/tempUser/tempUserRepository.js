const userRepository=require("../Users/userRepository")
const setTempUser=require("./SET/SetTempUser")
const getTempUser=require("./GET/GetTempUser")
const deleteTempUser=require("./DELETE/DeleteTempUser")

class tempUserRepository extends userRepository{
    constructor(){
        super()
        this.tempUsers=new Map();
    }

    getTempUser(email){
       return getTempUser(email,this.tempUsers);
    }

    setTempUser(userData){
        setTempUser(userData,this.tempUsers);
    }

    deleteTempUser(email){
        deleteTempUser(email,this.tempUsers);
    }

}

module.exports=new tempUserRepository();