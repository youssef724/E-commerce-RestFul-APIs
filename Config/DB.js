const mongoose = require("mongoose");
const DBConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to MongoDB Database" , process.env.MONGO_URL);
    })
};
module.exports = DBConnection;
