const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: String,
  role: String,
  company: String,
  content: String,
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
