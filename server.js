const app = require("./app");
const Connection = require("./config/database.js");
const cloudinary = require("cloudinary");
console.log(process.env.NODE_ENV == 'dev');
const path = require("path");
if (process.env.NODE_ENV === 'dev') {
  require("dotenv").config({
    path: path.resolve(__dirname + "/.env")
  });
}

//this error is when any unwanted thing is defind
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncougth Exception`);
  process.exit(1);
});

Connection();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running successfully on port ${process.env.PORT}`);
});

//Unhandled promise rejection -> this is the wrong url of mongodb error
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promiss Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
