import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
=======
import { Link } from "react-router-dom";
// import { Button, Table } from "react-bootstrap";
// import axios from "axios";
>>>>>>> a463304e1120e1f807ef30c691cf47a2bc999950
import "./Admin.module.css";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();

  useEffect(() => {
<<<<<<< HEAD
    axios
      .get("/check-user")
      .then((response) => {
        setIsLoggedIn(response.data.loggedIn);
        setIsAdmin(response.data.isAdmin);
      })
      .catch((error) => {
        console.log(error);
      });
=======
    // axios.get('/check-login-status')
    //   .then(response => {
    //     setLoggedIn(response.data.loggedIn);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
>>>>>>> a463304e1120e1f807ef30c691cf47a2bc999950
  }, []);

  if (!isLoggedIn) {
    history.push("/login");
  }

<<<<<<< HEAD
  if (!isAdmin && isLoggedIn) {
    history.push("/"); // assuming "/" is your homepage for non-admin users
=======
  //check user token
  //if user token is not valid, redirect to login page
  //if user token is valid, display admin page

  useEffect(() => {
    axios
      .get("/check-user-token")
      .then((response) => {
        if (!response.data.valid) {
          setLoggedIn(false);
        }
      })
      .catch((error) => {
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
>>>>>>> a463304e1120e1f807ef30c691cf47a2bc999950
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
