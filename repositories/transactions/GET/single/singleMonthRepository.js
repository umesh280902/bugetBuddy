const {transactionsModel}=require("../../../../models/transactions/transactions")
const monthSetter=require("../../../../helpers/month/monthSetter")
const expenseHelper=require("../../../../helpers/expense/expenseHelper")
const categoryHelper=require("../../../../helpers/category/categoryHelper")
const {monthNames}=require("../../../../helpers/date/dateGenerator")
const mongoose=require("mongoose")
class SingleMonthRepository {
  async getTransactions(month, year, userId) {
    const transactions = await transactionsModel.find({ userId: userId });
    const transact = monthSetter(transactions, month, year);
    return transact;
  }

  async TopTransactions(month, year, userId) {
    const transactions = await transactionsModel.aggregate([
      {
        $addFields: {
          transactionMonth: { $dateToString: { format: "%B", date: "$Date" } },
          transactionYear: { $dateToString: { format: "%Y", date: "$Date" } },
        },
      },
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          transactionMonth: month,
          transactionYear: year,
          type: "debit",
        },
      },
      {
        $sort: { Amount: -1 },
      },
      {
        $limit: 5,
      },
    ]);
  
    // 🧹 Manual transformation since aggregation returns plain objects
    const cleanTransactions = transactions.map((ret) => ({
      Amount: ret.Amount,
      ...(ret.type === "debit" && { To: ret.To }),
      ...(ret.type === "credit" && { From: ret.From }),
      userId: ret.userId,
      Date: ret.formatedDate ?? require("../../helpers/date/dateGenerator").dateGenerator(ret.Date),
      category: ret.category,
      type: ret.type,
      ...(ret.isSelfCredit && { isSelfCredit: ret.isSelfCredit }),
    }));
  
    return cleanTransactions;
  }
  
  
  


  async netExpenses(userId){
    const transactions = await transactionsModel.find({ userId: userId });
    const today = new Date();
    const currentYear = today.getFullYear().toString(); // Gets the current year
    const currentMonth = today.getMonth(); // Months are 0-based, so add 1
    const month=monthNames[currentMonth].toString();
    const transact = monthSetter(transactions, month, currentYear);
    return expenseHelper(transact);
  }
  async categorysorted(month, year, userId) {
    const transact = await this.getTransactions(month, year, userId);
    const transactions = categoryHelper(transact); // Sort transactions by category
    return transactions;
  }

  async categoryFilter(month, year, category, userId) {
    const transactionsForMonth = await this.getTransactions(month, year, userId);
    const filteredTransactions = transactionsForMonth.filter(
      (transaction) => transaction.category === category
    );
    return filteredTransactions;
  }

  async creditOrDebit(month,year,userId,type){
    let transactions=[]
    const transact=await this.getTransactions(month,year,userId);
    transact.forEach((singleTransact)=>{
      if(singleTransact.type===type){
        transactions.push(singleTransact);
      }
    })
    return transactions;
  }


}



module.exports=SingleMonthRepository