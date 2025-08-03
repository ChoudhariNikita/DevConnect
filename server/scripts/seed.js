const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Post = require('../models/Post');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI; // 🔁 Replace this

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear previous data (optional)
    await User.deleteMany();
    await Post.deleteMany();

    // Create sample users
    const users = await User.insertMany([
      {
        fullName: "Aarav Sharma",
        email: "aarav@example.com",
        password: await bcrypt.hash("password123", 10),
      },
      {
        fullName: "Meera Patel",
        email: "meera@example.com",
        password: await bcrypt.hash("password123", 10),
      },
      {
        fullName: "Raj Verma",
        email: "raj@example.com",
        password: await bcrypt.hash("password123", 10),
      },
    ]);

    console.log("👥 Users seeded");

    // Create posts for the users
    const posts = [
      {
        author: users[0]._id,
        role: "Frontend Developer",
        company: "Zeta Tech",
        content: "Just finished building a responsive portfolio with React + Vite!",
        likes: 5,
        likedBy: [users[1]._id, users[2]._id],
      },
      {
        author: users[1]._id,
        role: "Backend Engineer",
        company: "NodeCorp",
        content: "Node.js with MongoDB is an unbeatable combo! ❤️",
        likes: 3,
        likedBy: [users[0]._id],
      },
      {
        author: users[2]._id,
        role: "Full Stack Developer",
        company: "CodeNest",
        content: "Excited to share my latest MERN stack project 🚀",
        likes: 8,
        likedBy: [users[0]._id, users[1]._id],
      },
    ];

    await Post.insertMany(posts);
    console.log("📝 Posts seeded");

    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}

seed();
