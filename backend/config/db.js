const mongoose = require("mongoose");
const dns = require("dns");

const useFallbackDns = (setFallback) => {
  if (!setFallback) return;
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
  console.log("Using fallback DNS servers: 8.8.8.8, 8.8.4.4");
};

const connectDB = async (retries = 5, delayMs = 5000, fallbackDns = false) => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MongoDB connection failed: MONGO_URI is not defined in .env");
    process.exit(1);
  }

  useFallbackDns(fallbackDns);

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    if (!fallbackDns && error.message.includes("querySrv ECONNREFUSED")) {
      console.log("SRV lookup failed locally; retrying with public DNS...");
      return connectDB(retries, delayMs, true);
    }
    if (retries > 0) {
      console.log(`Retrying MongoDB connection in ${delayMs / 1000} seconds... (${retries} retries left)`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      return connectDB(retries - 1, delayMs, fallbackDns);
    }
    process.exit(1);
  }
};

module.exports = connectDB;
