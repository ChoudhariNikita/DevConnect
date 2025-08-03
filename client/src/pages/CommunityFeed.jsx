import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsEmojiSmile, BsPencilSquare } from 'react-icons/bs';

export default function CommunityFeed() {
  // Dummy: no posts initially
  const [posts, setPosts] = useState([]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <div className="container py-5 flex-grow-1">
        <h2 className="text-center fw-bold text-primary mb-4">Community Posts</h2>

        {posts.length === 0 ? (
          <div className="text-center">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-state-2130367-1800926.png"
              alt="No Posts"
              className="img-fluid"
              style={{ maxWidth: '400px' }}
            />
            <h4 className="mt-4 text-muted">No posts yet...</h4>
            <p className="text-muted">Looks like your feed is taking a nap 😴</p>
            <Link to="/create-post" className="btn btn-outline-primary btn-lg mt-3">
              <BsPencilSquare className="me-2" />
              Start the first conversation!
            </Link>
          </div>
        ) : (
          <div>
            {/* Map over posts when available */}
            {posts.map((post) => (
              <div className="card mb-3" key={post.id}>
                <div className="card-body">{post.content}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Optional Footer */}
      <footer className="bg-primary text-white text-center py-3 mt-auto">
        <div className="container">
          <small>
            <BsEmojiSmile className="me-1" />
            You're part of a growing tech community ❤️
          </small>
        </div>
      </footer>
    </div>
  );
}
