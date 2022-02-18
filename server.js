const connectDB = require("./config/db");
const app = require("./app");

// PORT
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
    startServer();
  }
};

// start the server
startServer();
