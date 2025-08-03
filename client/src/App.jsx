import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PostFeed from './pages/PostFeed';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import YourPosts from './pages/YourPosts';

function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feed" element={
            <PostFeed />
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/your-posts" element={
          <ProtectedRoute>
            <YourPosts />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
