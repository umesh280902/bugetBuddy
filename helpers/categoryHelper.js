var dummyData=require("./dateDummy")
function categoryHelper(transactions){
    let transact={}
    transactions.forEach(transaction => {
        let category=transaction.category
        if(transact[category]){
            transact[category]+=transaction.Amount
        }else{
            transact[category]=transaction.Amount
        }
    });

    return transact
}



module.exports=categoryHelper