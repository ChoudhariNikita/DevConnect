import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import Navbar from "../components/Navbar";

const dummyPosts = [
  {
    id: 1,
    content: "Excited to join DevConnect! Looking forward to connecting with fellow developers.",
    createdAt: "2024-06-01",
  },
  {
    id: 2,
    content: "Just finished a cool React project. Happy to share and get feedback!",
    createdAt: "2024-06-02",
  },
];

export default function YourPosts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState(dummyPosts);
  const [newPost, setNewPost] = useState("");

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    setPosts([
      {
        id: Date.now(),
        content: newPost,
        createdAt: new Date().toISOString().slice(0, 10),
      },
      ...posts,
    ]);
    setNewPost("");
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {/* Create Post */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <form onSubmit={handleCreatePost}>
                  <textarea
                    className="form-control mb-2"
                    rows={3}
                    placeholder="Share something with your network..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!newPost.trim()}
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
            {/* User's Posts */}
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="mb-3">Your Posts</h5>
                {posts.length === 0 && (
                  <p className="text-muted">You haven't posted anything yet.</p>
                )}
                {posts.map((post) => (
                  <div key={post.id} className="mb-4 border-bottom pb-3">
                    <div className="d-flex align-items-center mb-2">
                      <div
                        className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{ width: 40, height: 40, fontSize: 18 }}
                      >
                        {user?.fullName?.[0] || "U"}
                      </div>
                      <div>
                        <span className="fw-bold">{user?.fullName}</span>
                        <span className="text-muted ms-2 small">{post.createdAt}</span>
                      </div>
                    </div>
                    <div>{post.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}