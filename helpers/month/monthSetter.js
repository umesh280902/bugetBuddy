const {dateGenerator}=require("../date/dateGenerator")
const monthSetter=(transactions,month,year)=>{
    let transact=[]
    transactions.forEach((transaction) => {
      const date=dateGenerator(transaction.Date)
      const dateParts = date.split(" ");  // Split the date string
      console.log(dateParts)
      const transactionMonth = dateParts[3];          // Month is the 4th part
      const transactionYear = dateParts[4]; 
      if (transactionMonth === month && transactionYear === year) {
          transact.push(transaction);
        }
      });
      console.log(transact)
      return transact;
    
}

module.exports=monthSetter;