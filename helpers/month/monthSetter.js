const monthSetter=(transactions,month,year)=>{
    let transact=[]
    transactions.forEach((transaction) => {
        const tmonth = transaction.Date.split(" ")[3]; // Extract month
        const tyear = transaction.Date.split(" ")[4]; // Extract year
        if (tmonth === month && tyear === year) {
          transact.push(transaction);
        }
      });
      return transact;
    
}

module.exports=monthSetter;