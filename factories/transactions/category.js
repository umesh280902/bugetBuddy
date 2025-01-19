const {faker}=require("@faker-js/faker")
const {categoryEnum}=require("../../models/transactions/transactions")

const getRandomCategory = () => {
    return faker.helpers.arrayElement(Object.values(categoryEnum)); 
  };
  

module.exports=getRandomCategory