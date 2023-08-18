const mongoose = require("mongoose");

const Connection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Successfully connected with databse`);
  } catch (err) {
    console.log(`Error while connection with databse`);
    console.log(err);
  }
};

module.exports = Connection;
