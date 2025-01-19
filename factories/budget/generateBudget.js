const generateBudget=(min,max,decimals)=>{
    const randomBudget=(Math.random()*(max-min)+min)
    return parseInt(randomBudget)
}

module.exports=generateBudget