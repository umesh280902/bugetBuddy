const TransactionRepository=require("./GET/all/TransactionRepository")
const SingleMonthRepository=require("./GET/single/singleMonthRepository")
const createTransactions=require("./POST/createTransaction")
const allTransactions=require("./DELETE/alltransactions")
class TransactionsRepository{
    constructor(){
        this.transactionRepository= new TransactionRepository()
        this.singleMonthRepository=new SingleMonthRepository()
    }
    async createTransactions(transaction){
        return await createTransactions(transaction)
    }

    async deleteTransactions(){
        return await allTransactions()
    }

    get all(){
        return this.transactionRepository()
    }

    get single(){
        return this.singleMonthRepository()
    }

}

module.exports=new TransactionsRepository()