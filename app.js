const express = require("express");
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");
const connection = require("./config/db"); 
const authRouter = require("./routes/auth/auth");
const transactionRouter = require("./routes/transactions/transactions");
const budgetRouter=require("./routes/budget/budget")
const verificationRouter=require("./routes/emailVerification/POST/otp")
const errorHandler=require("./middleware/errorHandler")
const pythonScript = './ocr.py';
const app = express();
const multer = require("multer");
const { spawn } = require('child_process');
var name = "";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/");
  },
  filename: function (req, file, cb) {
    name=`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single('img'), (req, res) => {
  console.log("Image Uploading")
  var dis=""
  const childProcess = spawn('python3', [pythonScript, name]);
  childProcess.stdout.on('data', (data) => {
    dis=data.toString();
    console.log("Dis Output",dis);
    // res.send({"disease":dis})
  });
  
  childProcess.stderr.on('data', (data) => {
    console.error(data.toString());
  });
  
  childProcess.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
    console.log("Inside Close: ",dis);
    try {
      const parsed = JSON.parse(dis);

      const prediction = parsed?.predictions?.[0]; // get the first prediction object
      if (!prediction) {
        return res.status(400).json({ error: "No predictions found." });
      }

      const result = {
        supplier_name: prediction.supplier_name,
        total_amount: prediction.total_amount,
        category: prediction.category,
        sub_category: prediction.sub_category,
        date: prediction.date,
        time: prediction.time,
        supplier_address: prediction.supplier_address,
        locale: prediction.locale,
      };
      console.log("Result: ",result);
      res.send(result); 
    } catch (err) {
      console.error("JSON parsing error:", err.message);
      res.status(500).send({ error: "Failed to parse OCR output." });
    }
  });
})

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use("/auth", authRouter);
app.use("/email-verification",verificationRouter)
app.use("/transactions", transactionRouter);
app.use("/budget",budgetRouter)
app.use(function (req, res, next) {
  next(createError(404));
});

// app.use(function (err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   res.status(err.status || 500);
//   if (req.app.get("env") === "development") {
//     res.render("error");
//   } else {
//     res.send({ error: err.message });
//   }
// });

app.use(errorHandler);

module.exports = app;
