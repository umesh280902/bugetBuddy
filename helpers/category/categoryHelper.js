var dummyData=require("../date/dateDummy")
function categoryHelper(transactions){
    let transact={}
    const categoryMapping={
        "tour/travel":"travel",
        "tour":"travel",
        "travel":"travel"
    }
    
    transactions.forEach(transaction => {
        const category = categoryMapping[transaction.category] || transaction.category;
        if(transact[category]){
            transact[category]+=transaction.Amount
        }else{
            transact[category]=transaction.Amount
        }
    });
    const response={
        academics:transact.academics||0,
        entertainment: transact.entertainment||0,
        fashion: transact.fashion||0,
        food: transact.food||0,
        travel: transact.travel||0,
        others: transact.others||0,
    }

    console.log(response)
    return response
}



module.exports=categoryHelper