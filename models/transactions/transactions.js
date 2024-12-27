const mongoose = require("mongoose");
const { dateGenerator } = require("../../helpers/date/dateGenerator");

const categoryEnum = ["food", "entertainment", "tour/travel", "fashion", "academics", "others"];

const transactionSchema = new mongoose.Schema({
    Amount: {
        type: Number,
        required: true
    },
    To: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    Date: {
        type: Date,
        default: Date.now // Stores Date as a standard Date object
    },
    formatedDate: {
        type: String,
        required: true,
        default: function() { return dateGenerator(Date.now()); } // Format date at creation time
    },
    category: {
        type: String,
        required: true,
        enum: categoryEnum
    }
}, {
    timestamps: true,
    toObject: {
        transform: function (doc, ret) {
            // Only keep specific fields in the response
            return {
                Amount: ret.Amount,
                To: ret.To,
                userId: ret.userId,
                Date: ret.formatedDate,
                category: ret.category
            };
        }
    },
    toJSON: {
        transform: function (doc, ret) {
            // Only keep specific fields in the response
            return {
                Amount: ret.Amount,
                To: ret.To,
                userId: ret.userId,
                Date: ret.formatedDate,
                category: ret.category
            };
        }
    }
});

// Post-find middleware to ensure formatedDate is up-to-date
transactionSchema.post('find', function (results) {
    results.forEach(doc => {
        if (doc.Date instanceof Date) {
            doc.formatedDate = dateGenerator(doc.Date);
        }
    });
});

const transactionsModel = mongoose.model("Transactions", transactionSchema);
module.exports = { transactionsModel, categoryEnum };
