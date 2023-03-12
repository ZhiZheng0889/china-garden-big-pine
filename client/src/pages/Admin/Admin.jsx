//admin page
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Admin.module.css';
import FoodOptions from './FoodOptions';



const Admin = () => {
  //check if user is logged in
  //if not, redirect to login page
  //if so, display admin page

  return (
    <div>
      <h1>Admin Page</h1>
      <Link to="/admin/foodOptions">
        <Button variant="primary">Food Options</Button>
      </Link>
      <Link to="/admin/foodOptions/add">
        <Button variant="primary">Add Food Option</Button>
      </Link>
      <Link to="/admin/foodOptions/edit">
        <Button variant="primary">Edit Food Option</Button>
      </Link>
      <Link to="/admin/foodOptions/delete">
        <Button variant="primary">Delete Food Option</Button>
      </Link>
     

    </div>
  );
};

export default Admin;
