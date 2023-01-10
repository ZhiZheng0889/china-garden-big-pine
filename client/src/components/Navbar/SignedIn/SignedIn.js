import React from 'react';
import { Link } from 'react-router-dom';
const SignedIn = () => {
  return (
    <ul className="flex items-center">
      <li className="px-3 py-2">
        <Link to="/">Home</Link>
      </li>
      <li className="px-3 py-2">
        <Link to="/orders">Orders</Link>
      </li>
      <li className="px-3 py-2">
        <Link to="/profile">
          <i className="fa-light fa-circle-user fa-lg"></i>
        </Link>
      </li>
    </ul>
  );
};

export default SignedIn;
