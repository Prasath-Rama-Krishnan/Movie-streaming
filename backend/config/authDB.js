const mongoose = require("mongoose");

const connectAuthDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_USER_DB, {
      //uses latest mongodb url parser
      useNewUrlParser: true,
      //improves connection stability
      useUnifiedTopology: true,
    });
    console.log("✅ Auth DB Connected");
  } catch (err) {
    console.error("❌ Auth DB Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectAuthDB;
