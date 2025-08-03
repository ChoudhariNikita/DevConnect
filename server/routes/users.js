const express = require('express');
const router = express.Router();
const { getUserProfile, getUserPosts } = require('../controllers/userController');

// GET user profile by ID or email
router.get('/:id', getUserProfile);

// (Optional) GET posts by user ID
router.get('/:id/posts', getUserPosts);

module.exports = router;
