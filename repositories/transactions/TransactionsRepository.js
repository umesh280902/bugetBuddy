const TransactionRepository=require("./GET/all/TransactionRepository")
const SingleMonthRepository=require("./GET/single/singleMonthRepository")
const {transactionsModel}=require("../../models/transactions/transactions")
class TransactionsRepository{
    constructor(){
        this.transactionRepository= new TransactionRepository()
        this.singleMonthRepository=new SingleMonthRepository()
    }
    async createTransactions(transaction){
        const newTransaction = new transactionsModel(transaction);
        const savedTransaction = await newTransaction.save();
        return savedTransaction;
    }

    async deleteTransactions(){
        await transactionsModel.deleteMany()
        console.log("transactions deleted")
    }

    get all(){
        return this.transactionRepository()
    }

    get single(){
        return this.singleMonthRepository()
    }

}



module.exports=new TransactionsRepository()