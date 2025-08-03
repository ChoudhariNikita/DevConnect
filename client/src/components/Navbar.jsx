import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import ConfirmDialog from "../components/ConfirmDialog";
import {showAlert} from "../components/CustomAlert";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
  setShowLogoutDialog(false);
  logout();
  showAlert("success", "Logged out successfully 👋", "You will be redirected to the login page shortly.");
};

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          <i className="bi bi-linkedin me-2"></i>
          DevConnect
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!user && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex align-items-center"
                    to="/login"
                  >
                    <i className="bi bi-box-arrow-in-right me-2"></i> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex align-items-center"
                    to="/signup"
                  >
                    <i className="bi bi-person-plus me-2"></i> Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/feed">
                    <i className="bi bi-journal-text me-2"></i>
                    Community Posts
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link d-flex align-items-center" to="/feed">
                    <i className="bi bi-journal-text me-2 fs-7"></i>
                    Community Posts
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle border-0 bg-transparent d-flex align-items-center"
                    style={{ padding: "0.5rem 1rem" }}
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-person-circle me-2 fs-7"></i>
                    <span>
                      {user.fullName?.split(" ")[0] || "User"}
                    </span>
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link
                        className="dropdown-item d-flex align-items-center"
                        to="/profile"
                      >
                        <i className="bi bi-person-fill me-2"></i>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item d-flex align-items-center"
                        to="/your-posts"
                      >
                        <i className="bi bi-journal-text me-2"></i>
                        Your Posts
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item d-flex align-items-center text-danger"
                        onClick={handleLogoutClick}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <ConfirmDialog
        show={showLogoutDialog}
        title="Confirm Logout"
        message="Are you sure you want to logout? You will need to log in again to access your profile and posts."
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutDialog(false)}
        confirmText="Logout"
        cancelText="Cancel"
        confirmVariant="danger"
      />
    </nav>
  );
}
