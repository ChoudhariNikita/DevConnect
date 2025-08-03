import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  // ✅ SweetAlert Helper Function
  const showAlert = (type, title, text) => {
    Swal.fire({
      icon: type,
      title,
      text,
      confirmButtonText: "OK",
      confirmButtonColor: "#0a66c2", // LinkedIn blue
      customClass: {
        popup: "rounded-4 shadow",
        confirmButton: "btn btn-primary px-4",
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        showAlert("success", "Login Successful", "Welcome back!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        login(data.user);
        navigate("/feed", { replace: true });
      } else {
        showAlert("error", "Login Failed", data.message || "Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      showAlert("error", "Login Failed", "An error occurred during login.");
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
        style={{ minHeight: "100vh" }}
      >
        <div
          className="card p-5 shadow"
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <h3 className="text-center mb-4 text-primary">Login to DevConnect</h3>
          <form onSubmit={handleSubmit}>
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
              Login
            </button>
          </form>
          <p className="text-center mt-3">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
