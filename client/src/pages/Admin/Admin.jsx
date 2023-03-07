//admin page
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Admin.module.css';
import FoodOptions from './FoodOptions';

//go to FoodOptions.jsx
const Admin = () => {
  return (
    <div>
      <h2>Admin</h2>
      <Link to="/admin/food-options">
        <Button>Food Options</Button>
      </Link>
    </div>
  );
}

export default Admin;

