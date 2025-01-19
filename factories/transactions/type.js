const { faker } = require("@faker-js/faker"); 
const {transactionEnum}=require("../../models/transactions/transactions")

const getRandomType=()=>{
    return faker.helpers.arrayElement(Object.values(transactionEnum))
}

module.exports=getRandomType