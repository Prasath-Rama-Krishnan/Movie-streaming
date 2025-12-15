const mongoose = require("mongoose");

const connectAuthDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_USER_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Auth DB Connected");
  } catch (err) {
    console.error("❌ Auth DB Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectAuthDB;
