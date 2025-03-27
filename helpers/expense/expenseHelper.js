const expenseHelper=(transact)=>{
    let expense = 0;
        transact.forEach((singleTransact) => {
          if (singleTransact.type === "debit") {
            expense += singleTransact.Amount;
          } else {
            expense -= singleTransact.Amount;
          }
    });
    return expense
}

module.exports=expenseHelper;