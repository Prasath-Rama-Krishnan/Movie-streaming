const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getProfile,
  getWatchLater,
  addWatchLater,
  removeWatchLater,
} = require("../controllers/userController");

router.get("/profile", auth, getProfile);
router.get("/watch-later", auth, getWatchLater);
router.post("/watch-later/:movieId", auth, addWatchLater);
router.delete("/watch-later/:movieId", auth, removeWatchLater);

module.exports = router;
