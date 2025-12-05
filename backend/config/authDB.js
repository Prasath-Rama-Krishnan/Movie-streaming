const mongoose = require("mongoose");

const authDB = mongoose.createConnection(process.env.MONGO_USER_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

authDB.on("connected", () => console.log("✅ Auth DB Connected"));
authDB.on("error", (err) => console.log("❌ Auth DB Error:", err));

module.exports = authDB;
