const postTransaction=require("./POST/createTransaction")
const Single=require("./GET/single/single")
const All=require("./GET/all/all")


class transaction{
    constructor(){
        this.single=new Single()
        this.all=new All()
    }
    
    async postTransaction(req,res,next){
        return await postTransaction(req,res,next)
    }

}

module.exports=new transaction()