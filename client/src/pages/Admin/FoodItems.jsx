//FoodItems.jsx is a component that is used to display the food items in the admin page. The food items are displayed in a table. The table is c    
// // Path: client\src\pages\Admin\FoodItems.jsx
// // Compare this snippet from client\src\pages\Admin\UserEdit.jsx:
// // //UserEdit.jsx for user edit page (admin) using the backend api
// // //user edit page will have a form to edit a food item price
// // //user edit page will have a form to list food items by category
import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readFoodItem, updateFoodItem } from "../../api/foodItemApi";
import ErrorAlert from "../../errors/ErrorAlert";
//call the readFoodItem function from the foodItemApi.js file
//call the updateFoodItem function from the foodItemApi.js file
//call the ErrorAlert function from the ErrorAlert.js file
const FoodItems = () => {
    //create a variable called foodItem and set it to an empty object
    FoodItem = {
        foodItem_id: 0,
        foodItemName: "",
        foodItemPrice: 0,
        foodItemDescription: "",
        foodItemCategory: "",
        foodItemImage: "",
        foodItemQuantity: 0,
        foodItemStatus: "",
    };

    //create a variable called error and set it to null
    console.error("FoodItems.jsx: error = ", error);

    //create a variable called history and set it to useHistory
    history = useHistory(
        console.log("FoodItems.jsx: history = ", history) 
    );

    //create a variable called foodItem_id and set it to useParams
    foodItem_id = useParams(
        console.log("FoodItems.jsx: foodItem_id = ", foodItem_id)
    );

    //create a variable called foodItemName and set it to useState
    foodItemName = useState(
        console.log("FoodItems.jsx: foodItemName = ", foodItemName)
    );

    //create a variable called foodItemPrice and set it to useState
    foodItemPrice = useState(
        console.log("FoodItems.jsx: foodItemPrice = ", foodItemPrice)
    );

    //create a variable called foodItemDescription and set it to useState
    foodItemDescription = useState(
        console.log("FoodItems.jsx: foodItemDescription = ", foodItemDescription)
    );

    //create a variable called foodItemCategory and set it to useState
    foodItemCategory = useState(
        console.log("FoodItems.jsx: foodItemCategory = ", foodItemCategory)
    );

    //create a variable called foodItemImage and set it to useState
    foodItemImage = useState(
        console.log("FoodItems.jsx: foodItemImage = ", foodItemImage)
    );

    //create a variable called foodItemQuantity and set it to useState
    foodItemQuantity = useState(
        console.log("FoodItems.jsx: foodItemQuantity = ", foodItemQuantity)
    );

    //create a variable called foodItemStatus and set it to useState
    foodItemStatus = useState(
        console.log("FoodItems.jsx: foodItemStatus = ", foodItemStatus)
    );

    //create a variable called foodItemRating and set it to useState
    foodItemRating = useState(
        console.log("FoodItems.jsx: foodItemRating = ", foodItemRating)
    );
    
}

//return the form to change food item price and list food items by category
return (
    <div className="container">
        <div className="row">
            <div className="col">
                <h1>Food Items</h1>
                <ErrorAlert error={error} />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="foodItemName">Food Item Name</label>
                        <input

                            className="form-control"
                            id="foodItemName"
                            type="text"
                            name="foodItemName"
                            value={foodItemName}
                            onChange={handleChange}
                            required={true}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="foodItemPrice">Food Item Price</label>
                        <input
                            className="form-control"
                            id="foodItemPrice"
                            type="number"
                            name="foodItemPrice"
                            value={foodItemPrice}
                            onChange={handleChange}
                            required={true}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="foodItemDescription">Food Item Description</label>
                        <input
                            className="form-control"
                            id="foodItemDescription"
                            type="text"
                            name="foodItemDescription"
                            value={foodItemDescription}
                            onChange={handleChange}
                            required={true}
                        />  
                    </div>
                    <div className="form-group">
                        <label htmlFor="foodItemCategory">Food Item Category</label>
                        <input
                            className="form-control"
                            id="foodItemCategory"
                            type="text"
                            name="foodItemCategory"
                            value={foodItemCategory}
                            onChange={handleChange}
                            required={true}
                        /> 
                    </div>
                    <div className="form-group">
                        <label htmlFor="foodItemImage">Food Item Image</label>
                        <input
                            className="form-control"
                            id="foodItemImage"
                            type="text"
                            name="foodItemImage"
                            value={foodItemImage}
                            onChange={handleChange}
                            required={true}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="foodItemQuantity">Food Item Quantity</label>
                        <input
                            className="form-control"
                            id="foodItemQuantity"
                            type="number"
                            name="foodItemQuantity"
                            value={foodItemQuantity}
                            onChange={handleChange}
                            required={true}
                        />  
                    </div>
                    <div className="form-group">
                        <label htmlFor="foodItemStatus">Food Item Status</label>
                        <input
                            className="form-control"
                            id="foodItemStatus"
                            type="text"
                            name="foodItemStatus"
                            value={foodItemStatus}
                            onChange={handleChange}
                            required={true}
                        /> 
                    </div>
                    <div className="form-group">
                        <label htmlFor="foodItemRating">Food Item Rating</label>
                        <input
                            className="form-control"
                            id="foodItemRating"
                            type="number"
                            name="foodItemRating"
                            value={foodItemRating}
                            onChange={handleChange}
                            required={true}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <Link to={`/admin/foodItems/${foodItem_id}/edit`}>
                        <button className="btn btn-secondary">Cancel</button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
);

 //export the FoodItems function
export default FoodItems;