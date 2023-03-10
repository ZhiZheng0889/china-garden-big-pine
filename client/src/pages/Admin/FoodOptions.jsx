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
    useEffect(() => {
        axios
        .get("/api/food")
        .then((res) => {
            setFood(res.data);
        })
        .catch((err) => console.log(err));
    }, []);
    
    //display the food table in a table
    const foodTable = food.map((food) => {
        return (
            <tr key={food.id}>
                <td>{food.id}</td>
                <td>{food.name}</td>
                <td>{food.price}</td>
            </tr>
        );
    }
    );

    return (
        <div>
            <h2>Food Options</h2>
            <Link to="/admin">
                <Button>Back</Button>
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {foodTable}
                </tbody>
            </Table>
        </div>
    );
};

export default FoodOptions;

