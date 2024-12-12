const mongoose = require("mongoose");
const app = require("./src/app");
const { dbURL } = require("./src/config");

const port = process.env.PORT || 5000;
const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("Database Connected!");

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

connectDB();
