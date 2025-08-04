import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import Navbar from "../components/Navbar";
import { showAlert } from "../components/CustomAlert";
import axios from "axios";
import Footer from "../components/Footer";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    bio: "",
    skills: "",
    location: "",
  });

  const token = localStorage.getItem("token");
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(`${api}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
      setFormData({
        fullName: res.data.fullName || "",
        email: res.data.email || "",
        bio: res.data.bio || "",
        skills: res.data.skills?.join(", ") || "",
        location: res.data.location || "",
      });
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.post(
        `${api}/api/users/profile`,
        {
          ...formData,
          skills: formData.skills.split(",").map((s) => s.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(res.data.user || res.data); // support if backend sends {msg, user}
      showAlert(
        "success",
        "Profile Updated",
        res.data.msg || "Your changes were saved successfully."
      );
      setEditMode(false);
    } catch (err) {
      console.error("Update error:", err);
      const errorMessage =
        err.response?.data?.msg ||
        err.response?.data?.error ||
        "Please try again later.";
      showAlert("error", "Update Failed", errorMessage);
    }
  };

  if (!profile) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container py-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h3>{profile.fullName}</h3>
                    <p className="text-muted mb-2">
                      <i className="bi bi-envelope-fill me-2 text-primary"></i>
                      {profile.email}
                    </p>
                  </div>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setEditMode(!editMode)}
                  >
                    <i className="bi bi-pencil-fill me-1"></i>
                  </button>
                </div>

                {/* Fields */}
                <div className="mt-3">
                  <label className="fw-semibold mb-2">
                    <i className="bi bi-file-earmark-text me-2 text-secondary"></i>
                    Bio:
                  </label>
                  {editMode ? (
                    <textarea
                      name="bio"
                      className="form-control mb-2"
                      rows={2}
                      value={formData.bio}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{profile.bio || "—"}</p>
                  )}

                  <label className="fw-semibold mb-2">
                    <i className="bi bi-tools me-2 text-secondary"></i>
                    Skills:
                  </label>
                  {editMode ? (
                    <input
                      name="skills"
                      className="form-control mb-2"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="e.g. React, Node.js"
                    />
                  ) : (
                    <p>{profile.skills?.join(", ") || "—"}</p>
                  )}

                  <label className="fw-semibold mb-2">
                    <i className="bi bi-geo-alt-fill me-2 text-danger"></i>
                    Location:
                  </label>
                  {editMode ? (
                    <input
                      name="location"
                      className="form-control mb-2"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Your location"
                    />
                  ) : (
                    <p>{profile.location || "—"}</p>
                  )}
                </div>

                {editMode && (
                  <div className="d-flex justify-content-start mt-4 gap-2">
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleSave}
                    >
                      <i className="bi bi-save me-1"></i>
                      Save
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setEditMode(false)}
                    >
                      <i className="bi bi-x-circle me-1"></i>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
