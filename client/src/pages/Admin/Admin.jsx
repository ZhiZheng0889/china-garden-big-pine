import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Admin.module.css";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    axios
      .get("/check-user")
      .then((response) => {
        setIsLoggedIn(response.data.loggedIn);
        setIsAdmin(response.data.isAdmin);
      })
      .catch((error) => {});
    // axios.get('/check-login-status')
    //   .then(response => {
    //     setLoggedIn(response.data.loggedIn);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }, []);

  if (!isLoggedIn) {
    navigate("/login");
  }

  if (!isAdmin && isLoggedIn) {
    navigate("/"); // assuming "/" is your homepage for non-admin users
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-4">Admin Page</h1>
      <Link to="/admin/foodOptions">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Food Options
        </button>
      </Link>
    </div>
  );
}

export default Home;
