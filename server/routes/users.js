const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  getUserPosts,
  getProfile,
  updateProfile
} = require('../controllers/userController');
const authMiddleware = require("../middleware/authMiddleware");

router.get('/profile', authMiddleware, getProfile);
router.post('/profile', authMiddleware, updateProfile);
router.get('/:id', getUserProfile);
router.get('/:id/posts', getUserPosts);

module.exports = router;
