import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function YourPosts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [editContent, setEditContent] = useState("");

  const token = localStorage.getItem("token");

  // Fetch user's posts from backend
  useEffect(() => {
    axios
      .get(`/api/users/${user._id}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPosts(res.data));
  }, [user._id, token]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    const res = await axios.post(
      "/api/posts/create",
      { author: user._id, content: newPost },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setPosts([res.data, ...posts]);
    setNewPost("");
  };

  const handleEdit = (post) => {
    setEditingPost(post._id);
    setEditContent(post.content);
  };

  const handleUpdatePost = async (postId) => {
    const res = await axios.put(
      `/api/posts/${postId}`,
      { content: editContent },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setPosts(posts.map((p) => (p._id === postId ? res.data : p)));
    setEditingPost(null);
    setEditContent("");
  };

  const handleDeletePost = async (postId) => {
    await axios.delete(`/api/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPosts(posts.filter((p) => p._id !== postId));
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
                  <div key={post._id} className="mb-4 border-bottom pb-3">
                    <div className="d-flex align-items-center mb-2">
                      <div
                        className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{ width: 40, height: 40, fontSize: 18 }}
                      >
                        {user?.fullName?.[0] || "U"}
                      </div>
                      <div>
                        <span className="fw-bold">{user?.fullName}</span>
                        <span className="text-muted ms-2 small">
                          <br />
                          {new Date(post.createdAt).toLocaleDateString(
                            undefined,
                            { year: "numeric", month: "long", day: "numeric" }
                          )}{" "}
                          {new Date(post.createdAt).toLocaleTimeString(
                            undefined,
                            { hour: "numeric", minute: "2-digit" }
                          )}
                        </span>
                      </div>
                    </div>
                    <div>{post.content}</div>
                    {post.author === user._id && (
                      <div className="mt-2">
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEdit(post)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeletePost(post._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                    {editingPost === post._id && (
                      <div className="mt-3">
                        <textarea
                          className="form-control mb-2"
                          rows={2}
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                        />
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleUpdatePost(post._id)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => setEditingPost(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
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
