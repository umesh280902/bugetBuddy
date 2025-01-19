const selfCreditTransactionFactory=require("../factories/transactions/selfCreditTransactionFactory")

const selfCreditTransactionSeeders=async (n)=>{
    const promises=[]
    for(let i=0;i<n;i++){
        promises.push(selfCreditTransactionFactory())
    }
    await Promise.all(promises)

    console.log(`${n} transactions seeded for self successfully.`);
}

module.exports=selfCreditTransactionSeeders