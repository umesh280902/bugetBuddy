const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    Month: {
        type: String,
        required: true
    },
    Year: {
        type: String,
        required: true
    },
    Budget: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});


budgetSchema.post("find", function (results) {
    results.reverse()
});

const budgetModel = mongoose.model("Budget", budgetSchema);
module.exports = budgetModel;
