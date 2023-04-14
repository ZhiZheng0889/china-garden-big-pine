//Frontend page for admin users to view and edit food prices
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import "./FoodOptions.module.css";

//check if user is a admin user
//display food table
//display edit food price form

function FoodOptions() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [food, setFood] = useState([]);

  useEffect(() => {
    axios
      .get("/check-login-status")
      .then((response) => {
        setLoggedIn(response.data.loggedIn);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    axios
      .get("/food")
      .then((response) => {
        setFood(response.data);
      })
      .catch((error) => {});
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

  //change food price

  const changeFoodPrice = (event) => {
    event.preventDefault();
    const id = event.target.id.value;
    const price = event.target.price.value;
    axios
      .put(`/food/${id}`, { price })
      .then((response) => {
        setFood(response.data);
      })
      .catch((error) => {});
  };

  //display edit food price form
  //display food table

  return (
    <div>
      <h1>Food Options</h1>
      <form onSubmit={changeFoodPrice}>
        <label htmlFor="id">Food ID</label>
        <input type="text" name="id" />
        <label htmlFor="price">New Price</label>
        <input type="text" name="price" />
        <input type="submit" value="Change Price" />
      </form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {food.map((food) => (
            <tr key={food.id}>
              <td>{food.id}</td>
              <td>{food.name}</td>
              <td>{food.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default FoodOptions;
