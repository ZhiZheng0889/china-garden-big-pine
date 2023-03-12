//admin page for admin users
//check if user is logged in
//if user is not logged in, redirect to login page
//if user is logged in, display admin page
//display admin page

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import "./Admin.module.css";

//connect to the database and check if user is logged in
//if user is not logged in, redirect to login page
//if user is logged in, display admin page

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    axios.get('/check-login-status')
      .then(response => {
        setLoggedIn(response.data.loggedIn);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  if (!loggedIn) {
    return (
      <div>
        <h1>Admin Login</h1>
        <Link to="/login">
          <Button variant="primary">Login</Button>
        </Link>
      </div>
    );
  }

  //display admin page

  return (
    <div>
      <h1>Admin Page</h1>
      <Link to="/admin/foodOptions">
        <Button variant="primary">Food Options</Button>
      </Link>
    </div>
  );
}

export default Home;
