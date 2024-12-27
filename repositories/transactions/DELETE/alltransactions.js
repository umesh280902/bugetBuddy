const { transactionsModel } = require("../../../models/transactions/transactions");


async function allTransactions(){
    try{
        await transactionsModel.deleteMany()
        console.log("transactions deleted")
    }catch(error){
        throw new Error(`Error deleting transactions: ${error.message}`);
    }
}


module.exports=allTransactions