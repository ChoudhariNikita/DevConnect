import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import Navbar from "../components/Navbar";
import axios from "axios";
import { HiOutlineSparkles } from "react-icons/hi2";
import { FaThumbsUp } from "react-icons/fa";

export default function PostFeed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/posts").then((res) => {
      setPosts(res.data.reverse()); // newest first
      setLoading(false);
    });
  }, []);

  const handleLike = async (postId) => {
    if (!user) {
      alert("Please log in to like posts and enjoy the community!");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `/api/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts(
        posts.map((post) =>
          post._id === postId
            ? { ...post, likes: res.data.likes, liked: res.data.liked }
            : post
        )
      );
    } catch (err) {
      alert("Could not like post");
    }
  };

  // Show all posts if not logged in, otherwise exclude own posts
  const visiblePosts = user
    ? posts
        .filter((post) => post.author?._id !== user._id)
        .slice(0, visibleCount)
    : posts.slice(0, visibleCount);

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            {loading && <div>Loading posts...</div>}
            {!loading && visiblePosts.length === 0 ? (
              <div className="text-center my-5">
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/empty-state-2130367-1800926.png"
                  alt="No Posts"
                  className="img-fluid mb-4"
                  style={{ maxWidth: "300px" }}
                />
                <h5 className="text-muted">No posts to display</h5>
                <p className="text-muted">
                  Seems quiet here... Start a conversation or check back later!
                </p>
              </div>
            ) : (
              visiblePosts.map((post) => (
                <div key={post._id} className="card shadow-sm border-0 mb-4">
                  <div className="card-body p-4">
                    {/* Post Header */}
                    <div className="d-flex align-items-center mb-3">
                      <div
                        className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ width: "50px", height: "50px" }}
                      >
                        <span className="fw-bold small">
                          {post.author?.fullName
                            ? post.author.fullName[0]
                            : "U"}
                        </span>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0 fw-bold">
                          {post.author?.fullName || "Unknown"}
                        </h6>
                        <p className="mb-0 text-muted small">
                          Posted on{" "}
                          {new Date(post.createdAt).toLocaleDateString(
                            undefined,
                            { year: "numeric", month: "long", day: "numeric" }
                          )}{" "}
                          {new Date(post.createdAt)
                            .toLocaleTimeString(undefined, {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })
                            .replace("am", "AM")
                            .replace("pm", "PM")}
                        </p>
                      </div>
                    </div>
                    {/* Post Content */}
                    <p className="mb-3">{post.content}</p>
                    {/* Post Stats */}
                    <div className="border-top pt-3">
                      <div className="d-flex justify-content-between align-items-center text-muted small mb-3">
                        <span>{post.likes} likes</span>
                      </div>
                      {/* Like Button Only */}
                      <div className="d-flex justify-content-start">
                        <button
                          className={`btn btn-sm d-flex align-items-center px-3 py-2 rounded-pill border ${
                            post.liked
                              ? "border-primary text-primary bg-light"
                              : "border-light text-muted bg-white"
                          }`}
                          onClick={() => handleLike(post._id)}
                          style={{ transition: "all 0.2s ease-in-out !important" }}
                        >
                          <FaThumbsUp
                            className={`me-2 ${
                              post.liked ? "text-primary" : "text-muted"
                            }`}
                            style={{ fontSize: "1rem" }}
                          />
                          <span className="fw-semibold">Like</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            {/* Load More */}
            {!loading && (
              <div className="text-center py-4">
                {visibleCount <
                posts.filter((p) => !user || p.author?._id !== user._id)
                  .length ? (
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => setVisibleCount(visibleCount + 5)}
                  >
                    Load more posts
                  </button>
                ) : (
                  posts.length > 0 && (
                    <p className="text-muted d-flex justify-content-center align-items-center gap-2">
                      <HiOutlineSparkles size={20} className="text-primary" />
                      You're all caught up!
                    </p>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
