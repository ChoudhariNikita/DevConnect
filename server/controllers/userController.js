const User = require('../models/User');
const Post = require('../models/Post');

// Create or update profile (upsert)
exports.upsertUserProfile = async (req, res) => {
  try {
    const { fullName, email, bio, skills, location } = req.body;

    const userId = req.user.id; // from auth middleware

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          fullName,
          email,
          bio,
          skills: skills || [],
          location: location || "",
        },
      },
      { new: true, runValidators: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    console.error("Profile update error:", error.message);
    res.status(500).json({ error: "Server error while updating profile." });
  }
};

// Get logged-in user's profile
exports.getLoggedInProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user profile (excluding password)
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all posts by a user
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get logged-in user's profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { fullName, email, bio, skills, location } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { fullName, email, bio, skills: skills || [], location: location || "" } },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating profile." });
  }
};

