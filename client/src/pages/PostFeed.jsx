import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // 1. Import Navbar

export default function PostFeed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Sarah Chen",
      role: "Full Stack Developer",
      company: "TechCorp",
      time: "2h",
      content: "Just shipped a new feature using React and Node.js! The feeling of seeing your code come to life never gets old. Grateful to work with such an amazing team. 🚀",
      likes: 42,
      comments: 8,
      shares: 3,
      avatar: "SC",
      liked: false
    },
    {
      id: 2,
      author: "Alex Rodriguez",
      role: "Senior Frontend Engineer",
      company: "StartupXYZ",
      time: "4h",
      content: "Excited to announce that I'll be speaking at DevConf 2024! My talk will be on 'Building Scalable React Applications'. Looking forward to sharing insights with the community. Who else will be there?",
      likes: 89,
      comments: 15,
      shares: 12,
      avatar: "AR",
      liked: true
    },
    {
      id: 3,
      author: "Maria Garcia",
      role: "DevOps Engineer",
      company: "CloudSolutions",
      time: "6h",
      content: "Successfully migrated our entire infrastructure to Kubernetes! The journey was challenging but incredibly rewarding. Shoutout to my team for their dedication and late-night debugging sessions. ☁️",
      likes: 156,
      comments: 23,
      shares: 18,
      avatar: "MG",
      liked: false
    },
    {
      id: 4,
      author: "David Kim",
      role: "Mobile Developer",
      company: "AppInnovate",
      time: "8h",
      content: "Our new mobile app just hit 100K downloads! 🎉 Working with Flutter has been an amazing experience. The cross-platform capabilities saved us months of development time.",
      likes: 234,
      comments: 45,
      shares: 28,
      avatar: "DK",
      liked: true
    }
  ]);

  const [newPost, setNewPost] = useState('');

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        author: "You",
        role: "Developer",
        company: "DevConnect",
        time: "now",
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        avatar: "YO",
        liked: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  return (
    <>
      <Navbar /> 

      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            
            {/* Create Post Card */}
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div 
                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{width: '50px', height: '50px'}}
                  >
                    <span className="fw-bold">YO</span>
                  </div>
                  <div className="flex-grow-1">
                    <textarea
                      className="form-control border-0 shadow-none"
                      rows="3"
                      placeholder="What's on your mind? Share your dev journey..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      style={{resize: 'none'}}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-muted small">
                    <span className="me-3">📷 Photo</span>
                    <span className="me-3">🎥 Video</span>
                    <span>📄 Document</span>
                  </div>
                  <button 
                    className="btn btn-primary px-4"
                    onClick={handleCreatePost}
                    disabled={!newPost.trim()}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            {posts.map(post => (
              <div key={post.id} className="card shadow-sm border-0 mb-4">
                <div className="card-body p-4">
                  
                  {/* Post Header */}
                  <div className="d-flex align-items-center mb-3">
                    <div 
                      className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{width: '50px', height: '50px'}}
                    >
                      <span className="fw-bold small">{post.avatar}</span>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-0 fw-bold">{post.author}</h6>
                      <p className="mb-0 text-muted small">{post.role} at {post.company}</p>
                      <p className="mb-0 text-muted small">{post.time} • 🌍</p>
                    </div>
                    <div className="dropdown">
                      <button 
                        className="btn btn-sm text-muted" 
                        type="button" 
                        data-bs-toggle="dropdown"
                      >
                        ⋯
                      </button>
                      <ul className="dropdown-menu">
                        <li><button className="dropdown-item">Save post</button></li>
                        <li><button className="dropdown-item">Hide post</button></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item">Report post</button></li>
                      </ul>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="mb-3">{post.content}</p>

                  {/* Post Stats */}
                  <div className="border-top pt-3">
                    <div className="d-flex justify-content-between align-items-center text-muted small mb-3">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments • {post.shares} shares</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex justify-content-around">
                      <button 
                        className={`btn btn-sm flex-fill me-1 ${post.liked ? 'text-primary' : 'text-muted'}`}
                        onClick={() => handleLike(post.id)}
                      >
                        <span className="me-2">👍</span> Like
                      </button>
                      <button className="btn btn-sm text-muted flex-fill me-1">
                        <span className="me-2">💬</span> Comment
                      </button>
                      <button className="btn btn-sm text-muted flex-fill me-1">
                        <span className="me-2">🔄</span> Share
                      </button>
                      <button className="btn btn-sm text-muted flex-fill">
                        <span className="me-2">📤</span> Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Load More */}
            <div className="text-center py-4">
              <button className="btn btn-outline-primary">
                Load more posts
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
