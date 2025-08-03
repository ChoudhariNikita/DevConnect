const express = require('express');
const router = express.Router();
const { createPost, getPosts, likePost } = require('../controllers/postController');
// const auth = require('../middleware/authMiddleware'); // If you want JWT-protected

router.post('/create', createPost); // Use auth if secured
router.get('/', getPosts);
router.put('/:id/like', likePost);

module.exports = router;
