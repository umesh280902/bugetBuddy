const Amount=require("./amount")
const categoryFilter=require("./category")
const categorysorted=require("./categorysorted")
const getTransactions=require("./getTransactions")
const MonthSum=require("./monthsum")

class TransactionRepository{
    async Amount(amount){
        return await Amount(amount)
    }

    async MonthSum(userId){
        return await MonthSum(userId)
    }
    async categoryFilter(category, userId){
        return await categoryFilter(category, userId)
    }
    async categorysorted(userId){
        return await categorysorted(userId)
    }
    async getTransactions(userId) {
        return await getTransactions(userId)
    }
}

module.exports=TransactionRepository