import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./Admin.module.css";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();

  useEffect(() => {
    axios
      .get("/check-user")
      .then((response) => {
        setIsLoggedIn(response.data.loggedIn);
        setIsAdmin(response.data.isAdmin);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!isLoggedIn) {
    history.push("/login");
  }

  if (!isAdmin && isLoggedIn) {
    history.push("/"); // assuming "/" is your homepage for non-admin users
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
