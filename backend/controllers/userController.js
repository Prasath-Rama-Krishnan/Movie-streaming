const User = require("../models/User");

// GET PROFILE
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

// GET WATCH LATER
exports.getWatchLater = async (req, res) => {
  const user = await User.findById(req.user.id).populate("watchLater");
  res.json(user.watchLater);
};

// ADD TO WATCH LATER
exports.addWatchLater = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user.watchLater.includes(req.params.movieId)) {
    user.watchLater.push(req.params.movieId);
    await user.save();
  }
  res.json({ msg: "Added to Watch Later" });
};

// REMOVE FROM WATCH LATER
exports.removeWatchLater = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.watchLater = user.watchLater.filter(
    (id) => id.toString() !== req.params.movieId
  );
  await user.save();
  res.json({ msg: "Removed from Watch Later" });
};
