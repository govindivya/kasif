const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const errorMiddleware = require("./middleware/error");

var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());
app.use(fileUpload());

//Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
///this code for hosting

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
  });
}

//for using error middleware we have to register in app.js
app.use(errorMiddleware);

module.exports = app;
