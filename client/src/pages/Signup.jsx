import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", formData);
      console.log("Signup successful:", res.data);
      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed!");
    }
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3" to="/">
          <i className="bi bi-linkedin me-2"></i>
            DevConnect
          </Link>
          <ul className="navbar-nav flex-row">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                <i className="bi bi-house-fill me-2"></i>
                Home
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <div
          className="card p-5 shadow"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <h3 className="text-center mb-4 text-primary">Create Your Account</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Sign Up
            </button>
          </form>
          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
      <Footer/>
    </>
  );
}
