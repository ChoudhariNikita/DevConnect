const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { author, role, company, content } = req.body;
    const post = new Post({ author, role, company, content });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
    res.status(500).json({ error: err.message });
  }
};
