var mongoose=require("mongoose")
var {dateGenerator}=require("../helpers/dateGenerator")

const categoryEnum=["food", "entertainment", "tour/travel", "fashion", "academics", "others"]

const transactionSchema = new mongoose.Schema({
    Amount: {
        type: Number,
        required: true
    },
    To: {
        type: String,
        required: true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    Date: {
        type: String,
        required: true,
        default: dateGenerator // Default to current UTC time
    },
    category: {
        type: String,
        required:true,
        enum: categoryEnum
    }
}, {
    timestamps: true
});

const transactionsModel=mongoose.model("Transactions",transactionSchema)
module.exports={transactionsModel,categoryEnum}