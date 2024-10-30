const getTransactions=require("./getTransactions")
const CategorySortedMonth=require("./categorysorted")
const CategoryMonth=require("./category")

class Single{
    async getTransactions(req,res){
        return await getTransactions(req,res)
    }

    async CategoryMonth(req,res){
        return await CategoryMonth(req,res)
    }

    async CategorySortedMonth(req,res){
        return await CategorySortedMonth(req,res)
    }

}

module.exports= Single