const {monthNames, dateGenerator}=require("./../date/dateGenerator")
const expenseAllHelper=(transactions)=>{
    let expense = {};
    for(let i=0;i<12;i++){
        expense[monthNames[i]]=0;
    }
    
    transactions.forEach((transact)=>{
        const date=dateGenerator(transact.Date);
        const dateParts = date.split(" ");  // Split the date string
        const transactionMonth = dateParts[3];          // Month is the 4th part
        const transactionYear = parseInt(dateParts[4]); 
        const currentYear = new Date().getFullYear();   // Get the current year
        if(transactionYear===currentYear){
            if(transact.type==="credit"){
                expense[transactionMonth]-=transact.Amount;
            }else{
                expense[transactionMonth]+=transact.Amount;
            }
        }
    })
    return expense
}

module.exports=expenseAllHelper;