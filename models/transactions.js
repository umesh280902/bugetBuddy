var mongoose=require("mongoose")
var dateGenerator=require("../helpers/dateGenerator")


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
        enum: ["food", "entertainment", "tour/travel", "fashion", "academics", "others"]
    }
}, {
    timestamps: true
});


module.exports=mongoose.model("Transactions",transactionSchema)