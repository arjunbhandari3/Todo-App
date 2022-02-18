const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/todo_app";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected", conn.connection._connectionString);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
