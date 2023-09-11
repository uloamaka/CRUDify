const mongoose = require("mongoose");
// const localDB = "mongodb://localhost:27017/hngTask2DB";
  // const connectDB = async () => {
  //   await mongoose
  //     .connect(localDB, {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //     })
  //     .then(() => console.log("mongoDB connected successfully!"))
  //     .catch((err) => console.error("Could not connect to mongoDB", err));
  // };
const connectDB = async () => {
  try {
    const url =
      process.env.MONGODB_URL || "mongodb://localhost:27017/hngTask2DB";

    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection error:", error.message);
  }
};

module.exports = connectDB;