//request the food table from the database
//and display it in a table
//give user the option to add, edit, or delete food prices
//and to add, edit, or delete food items

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import "./Admin.module.css";

const FoodOptions = () => {
    const [food, setFood] = useState([]);
    const [foodPrice, setFoodPrice] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    useEffect(() => {
        axios.get('/api/food')
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    , []);

    return (
        <div>
            <h2>Food Options</h2>
            <Link to="/admin">
                <Button>Back</Button>
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Food Item</th>
                        <th>Food Price</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Food Item</td>
                        <td>Food Price</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default FoodOptions;
