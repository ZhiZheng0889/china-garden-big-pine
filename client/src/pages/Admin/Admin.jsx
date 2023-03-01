//admin page
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Admin.css';

//change the price for food items
//change the price for food options

const Admin = () => {
  return (
    <div className="admin">
      <h1>Admin</h1>
      <Link to="/admin/food">
        <Button variant="primary">Food</Button>
      </Link>
      <Link to="/admin/food-options">
        <Button variant="primary">Food Options</Button>
      </Link>
    </div>
  );
}

export default Admin;
