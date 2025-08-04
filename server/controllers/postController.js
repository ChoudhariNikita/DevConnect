const Post = require("../models/Post");

// Create Post
exports.createPost = async (req, res) => {
  try {
    const { author, role, company, content } = req.body;
    const post = new Post({ author, role, company, content });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get All Posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "fullName")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Like or Unlike Post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    const liked = post.likedBy.includes(req.user.id);
    if (liked) {
      post.likes--;
      post.likedBy.pull(req.user.id);
    } else {
      post.likes++;
      post.likedBy.push(req.user.id);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update Post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }
    post.content = req.body.content;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete Post (Add for completeness)
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }
    await post.deleteOne();
    res.json({ msg: "Post deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
