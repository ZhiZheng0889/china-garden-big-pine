import React from 'react';
import { Link } from 'react-router-dom';
const NotSignedIn = () => {
  return (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/signup" className="nav-link">
          Signup
        </Link>
      </li>
    </ul>
  );
};

export default NotSignedIn;
