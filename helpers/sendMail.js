var nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables from .env file


const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'umeshkumawat2809@gmail.com',
    pass: 'kmze flud mzih hpxk',
  },
});

async function sendMail( to, subject, text ) {
  const mailOptions = {
    from: "BudgetBuddy <no-reply@BudgetBuddy.com>",
    to,
    subject,
    text,
  };
  return new Promise((resolve, reject) => {
    mailTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error); // Properly reject the promise with the error
      }
      return resolve(info); // Properly resolve the promise with the info
    });
  });
}

module.exports = sendMail;