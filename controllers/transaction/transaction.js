const postTransaction=require("./POST/createTransaction")
const Single=require("./GET/single/single")
const All=require("./GET/all/all")


class transaction{
    constructor(){
        this.single=new Single()
        this.all=new All()
    }
    
    async postTransaction(req,res){
        return await postTransaction(req,res)
    }

}

module.exports=new transaction()