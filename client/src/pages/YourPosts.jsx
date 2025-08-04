import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import Navbar from "../components/Navbar";
import axios from "axios";
import Button from "../components/Button";
import Footer from "../components/Footer";
import ConfirmDialog from "../components/ConfirmDialog";
import { showAlert } from "../components/CustomAlert";

export default function YourPosts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const token = localStorage.getItem("token");
  const api = import.meta.env.VITE_API_URL;

  // Fetch user's posts from backend
  useEffect(() => {
    axios
      .get(`${api}/api/users/${user._id}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPosts(res.data));
  }, [user._id, token]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      const res = await axios.post(
        `${api}/api/posts/create`,
        { author: user._id, content: newPost },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const isFirstPost = posts.length === 0;

      setPosts([res.data, ...posts]);
      setNewPost("");

      if (isFirstPost) {
        showAlert(
          "success",
          "Yaaay !!🚀🎉",
          "Your first post is live! Let the world know who you are!"
        );
      }
    } catch (err) {
      showAlert(
        "error",
        "Post Failed",
        err.response?.data?.msg || "Couldn't create post."
      );
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post._id);
    setEditContent(post.content);
  };

  const handleUpdatePost = async (postId) => {
    try {
      const res = await axios.put(
        `${api}/api/posts/${postId}`,
        { content: editContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts(posts.map((p) => (p._id === postId ? res.data : p)));
      setEditingPost(null);
      setEditContent("");
      showAlert("success", "Update Successful", "Your post has been updated!");
    } catch (err) {
      showAlert(
        "error",
        "Update Failed",
        err.response?.data?.msg || "Couldn't update post."
      );
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`${api}/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((p) => p._id !== postId));
      showAlert("success", "Deleted!", "Your post has been deleted.");
    } catch (err) {
      showAlert(
        "error",
        "Delete Failed",
        err.response?.data?.msg || "Couldn't delete post."
      );
    }
  };

  const handleDeleteClick = (postId) => {
    setPostToDelete(postId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    await handleDeletePost(postToDelete);
    setShowDeleteDialog(false);
    setPostToDelete(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container py-5 flex-grow-1">
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
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 d-flex justify-content-center align-items-center gap-2"
                    disabled={!newPost.trim()}
                  >
                    Post <i className="bi bi-send-fill"></i>
                  </Button>
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
                    <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                      <div className="d-flex align-items-start gap-2">
                        <div
                          className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: 40, height: 40, fontSize: 18 }}
                        >
                          {user?.fullName?.[0] || "U"}
                        </div>
                        <div>
                          <div className="fw-bold">{user?.fullName}</div>
                          <div className="text-muted small">
                            {new Date(post.createdAt).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}{" "}
                            {new Date(post.createdAt)
                              .toLocaleTimeString(undefined, {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              })
                              .replace("am", "AM")
                              .replace("pm", "PM")}
                          </div>
                        </div>
                      </div>

                      {/* Right: Buttons */}
                      {post.author === user._id && (
                        <div className="d-flex mt-2 mt-md-0">
                          <Button
                            variant="light"
                            size="sm"
                            className="me-2 border"
                            onClick={() => handleEdit(post)}
                            title="Edit Post"
                          >
                            <i className="bi bi-pencil-fill text-primary"></i>
                          </Button>
                          <Button
                            variant="light"
                            size="sm"
                            className="border"
                            onClick={() => handleDeleteClick(post._id)}
                            title="Delete Post"
                          >
                            <i className="bi bi-trash-fill text-danger"></i>
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Content Area or Edit Mode */}
                    {editingPost === post._id ? (
                      <div className="mt-2">
                        <textarea
                          className="form-control mb-2"
                          rows={2}
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                        />
                        <div className="d-flex gap-2">
                          <Button
                            className="btn-sm btn-primary"
                            onClick={() => handleUpdatePost(post._id)}
                          >
                            Update
                          </Button>
                          <Button
                            className="btn-sm btn-secondary"
                            onClick={() => setEditingPost(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2">{post.content}</div>
                    )}
                  </div>
                ))}

                {/* Delete Confirmation */}
                <ConfirmDialog
                  show={showDeleteDialog}
                  title="Delete Post"
                  message="Are you sure you want to delete this post?"
                  onConfirm={confirmDelete}
                  onCancel={() => setShowDeleteDialog(false)}
                  confirmText="Delete"
                  cancelText="Cancel"
                  confirmVariant="danger"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
