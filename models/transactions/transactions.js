const mongoose = require("mongoose");
const { dateGenerator,parseUserDateToUTC } = require("../../helpers/date/dateGenerator");

const categoryEnum = [
  "food",
  "entertainment",
  "tour/travel",
  "fashion",
  "academics",
  "others",
];
const transactionEnum = ["debit", "credit"];
const transactionSchema = new mongoose.Schema(
  {
    Amount: {
      type: Number,
      required: true,
    },
    To: {
      type: String,
      required: function () {
        return this.type === "debit";
      },
    },
    From: {
      type: String,
      required: function () {
        return this.type === "credit" && this.isSelfCredit === false;
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Date: {
      type: Date,
      required:true
    },
    formatedDate: {
      type: String,
      required: true,
      default: function () {
        return dateGenerator(Date.now());
      },
    },
    category: {
      type: String,
      required: true,
      enum: categoryEnum,
    },
    type: {
      type: String,
      required: true,
      enum: transactionEnum,
    },
    isSelfCredit: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc, ret) {
        return {
          Amount: ret.Amount,
          ...(ret.type === "debit" && { To: ret.To }),
          ...(ret.type === "credit" && { From: ret.From }),
          userId: ret.userId,
          Date: ret.formatedDate,
          category: ret.category,
          type: ret.type,
          ...(ret.isSelfCredit && { isSelfCredit: ret.isSelfCredit }),
        };
      },
    },
    toJSON: {
      transform: function (doc, ret) {
        return {
          Amount: ret.Amount,
          ...(ret.type === "debit" && { To: ret.To }),
          ...(ret.type === "credit" && { From: ret.From }),
          userId: ret.userId,
          Date: ret.formatedDate,
          category: ret.category,
          type: ret.type,
          ...(ret.isSelfCredit && { isSelfCredit: ret.isSelfCredit }),
        };
      },
    },
  }
);

// Pre-save middleware to set the default for `From`
transactionSchema.pre("save", async function (next) {
  try {
    if(this.Date!==null){
      this.Date=parseUserDateToUTC(this.Date)
    }else{
      this.Date= Date.now();
    }


    if (this.isSelfCredit && this.type === "debit") {
      return next(new Error("isSelfCredit cannot be true for a debit transaction."));
    }

    if (this.isSelfCredit && this.type === "credit") {
      const User = mongoose.model("User");
      const user = await User.findById(this.userId);

      if (!user) {
        return next(new Error("User not found."));
      }

      const fullName = `${user.firstName} ${user.lastName}`;
      if (!this.From) {
        this.From = fullName; // Dynamically set the default value here
      } else if (this.From !== fullName) {
        return next(new Error(`From field must match the user's full name: ${fullName}`));
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});

transactionSchema.pre("find",function(){
  this.sort({Date:-1});
})



// Post-find middleware to ensure formatedDate is up-to-date
transactionSchema.post("find", function (results) {
  results.forEach((doc) => {
    if (doc.Date instanceof Date) {
      doc.formatedDate = dateGenerator(doc.Date);
    }
  });
});

const transactionsModel = mongoose.model("Transactions", transactionSchema);
module.exports = { transactionsModel, categoryEnum, transactionEnum };
