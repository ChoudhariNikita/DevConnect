import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <div className="container-fluid bg-light py-5 flex-grow-1">
        <div className="container text-center">
          <h1 className="display-4 fw-bold text-primary mb-4">Welcome to DevConnect</h1>
          <p className="lead text-muted mb-4">
            Connect with developers worldwide, share your projects, and grow your professional network.
          </p>
          <Link to="/signup" className="btn btn-primary btn-lg px-5">Join Now</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
