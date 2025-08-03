import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function UserProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profileRes = await axios.get(`/api/users/${id}`);
        setProfile(profileRes.data);

        const postsRes = await axios.get(`/api/users/${id}/posts`);
        setPosts(postsRes.data);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container py-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {!profile ? (
              <p>Loading...</p>
            ) : (
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h3 className="fw-bold">{profile.fullName}</h3>
                  {profile.bio && (
                    <p className="text-muted mb-1">{profile.bio}</p>
                  )}
                  {profile.location && (
                    <p className="mb-0">
                      <i className="bi bi-geo-alt-fill me-2"></i>
                      {profile.location}
                    </p>
                  )}
                  {profile.skills?.length > 0 && (
                    <p className="mb-0">
                      <i className="bi bi-tools me-2"></i>
                      Skills: {profile.skills.join(", ")}
                    </p>
                  )}
                </div>
              </div>
            )}

            <h5 className="mb-3 text-primary">Posts by {profile?.fullName}</h5>
            {posts.length === 0 ? (
              <p className="text-muted">No posts yet.</p>
            ) : (
              posts.map((post) => (
                <div key={post._id} className="card mb-3 shadow-sm border-0">
                  <div className="card-body">
                    <p className="mb-2">{post.content}</p>

                    <div className="d-flex justify-content-between align-items-center text-muted small">
                      <div>
                        <i className="bi bi-hand-thumbs-up-fill me-1"></i>
                        {post.likes} {post.likes === 1 ? "like" : "likes"}
                      </div>
                      <div>
                        {new Date(post.createdAt).toLocaleDateString()}{" "}
                        {new Date(post.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
