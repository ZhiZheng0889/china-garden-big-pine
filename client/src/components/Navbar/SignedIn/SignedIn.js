import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserApi } from '../../../api/userApi';
import { storage } from '../../../utils/Storage';
const SignedIn = ({ user, setUser, setError }) => {
  const navigate = useNavigate();
  const logout = async () => {
    setError(null);
    try {
      const abortController = new AbortController();
      const response = await UserApi.logout(
        user.user_id,
        abortController.signal
      );
      if (response.satus === 200) {
        setUser(null);
        storage.local.remove('refreshToken');
        navigate('/');
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <ul className="flex items-center">
      <li className="px-3 py-2">
        <Link to="/">Home</Link>
      </li>
      <li className="px-3 py-2">
        <Link to="/orders">Orders</Link>
      </li>
      <li className="px-3 py-2">
        <button onClick={logout}>Logout</button>
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
