import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3" to="/">DevConnect</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container-fluid bg-light py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold text-primary mb-4">Welcome to DevConnect</h1>
          <p className="lead text-muted mb-4">
            Connect with developers worldwide, share your projects, and grow your professional network.
          </p>
          <Link to="/signup" className="btn btn-primary btn-lg px-5">Join Now</Link>
        </div>
      </div>
    </>
  );
}
