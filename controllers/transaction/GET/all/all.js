const categorySorted=require("./categorysorted")
const category=require("./category")
const RecentTransaction=require("./recentTransactions")
const MonthSum=require("./monthsum")
const Amount=require("./amount")
const allTransaction=require("./allTransactions")
class All{

    async allTransaction(req,res){
        return await allTransaction(req,res)
    }

    async Amount(req,res){
        return await Amount(req,res)
    }

    async category(req,res){
        return await category(req,res)
    }

    async categorySorted(req,res){
        return await categorySorted(req,res)
    }

    async RecentTransaction(req,res){
        return await RecentTransaction(req,res)
    }

    async MonthSum(req,res){
        return await MonthSum(req,res)
    }

}

module.exports=All