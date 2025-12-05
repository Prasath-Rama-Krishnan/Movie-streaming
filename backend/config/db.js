const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_USER_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Auth DB Connected Successfully");
  } catch (err) {
    console.log("❌ Auth DB Connection Error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
