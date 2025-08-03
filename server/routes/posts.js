const express = require('express');
const router = express.Router();
const { createPost, getPosts, likePost, updatePost, deletePost } = require('../controllers/postController');
const auth = require('../middleware/authMiddleware'); // If you want JWT-protected

router.post('/create', auth, createPost); // Use auth if secured
router.get('/', getPosts);
router.put('/:id/like', auth, likePost);
router.put('/:id', auth, updatePost);      // Edit post
router.delete('/:id', auth, deletePost);   // Delete post

module.exports = router;
