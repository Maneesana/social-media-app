const mongoose = require("mongoose");

const dbConnect = async () => {
  await mongoose
    .connect(process.env.MONGODB_DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      console.log("Mongodb  database is connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConnect;
