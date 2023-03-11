//request the food table from the database
//and display it in a table
//give user the option to add, edit, or delete food prices
//and to add, edit, or delete food items

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import "./Admin.module.css";

//connect to the database and get the food table
//display the food table in a table
//give user the option to add, edit, or delete food prices
//and to add, edit, or delete food items

const FoodOptions = () => {
    const [food, setFood] = useState([]);
    
    //get the food table from the database
    //get foodOptions table from the database

    useEffect(() => {
        axios.get("/api/foodOptions").then((res) => {
            setFood(res.data);
        });
    }
    , []);

    //delete a food item from the database

    const deleteFood = (id) => {
        axios.delete(`/api/foodOptions/${id}`).then((res) => {
            setFood(food.filter((food) => food.id !== id));
        });
    }

    //display the food table in a table
    //give user the option to add, edit, or delete food prices

    return (
        <div>
            <h1>Food Options</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Food Item</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {food.map((food) => (
                        <tr key={food.id}>
                            <td>{food.foodItem}</td>
                            <td>{food.price}</td>
                            <td>
                                <Link to={`/admin/foodOptions/edit/${food.id}`}>
                                    <Button variant="primary">Edit</Button>
                                </Link>
                                <Button

                                    variant="danger"
                                    onClick={() => deleteFood(food.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Link to="/admin/foodOptions/add">
                <Button variant="primary">Add Food Item</Button>
            </Link>
        </div>

    );
};

export default FoodOptions;

