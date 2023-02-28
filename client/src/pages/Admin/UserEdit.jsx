//UserEdit.jsx for user edit page (admin) using the backend api
//user edit page will have a form to edit a user
//user edit page will have a form to delete a user
//user edit page will have a form to list a user
//user edit page will have a form to add a new user

import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readUser, updateUser } from "../../api/userApi";
import ErrorAlert from "../../errors/ErrorAlert";
//call the readUser function from the userApi.js file
//call the updateUser function from the userApi.js file
//call the ErrorAlert function from the ErrorAlert.js file
const UserEdit = () => {
    //create a variable called history and set it to the useHistory function
    const history = useHistory();
    //create a variable called params and set it to the useParams function
    const params = useParams();
    //create a variable called userId and set it to the user_id property of the params object
    const userId = params.user_id;
    //create a variable called [user, setUser] and set it to the useState function
    const [user, setUser] = useState({});
    //create a variable called [error, setError] and set it to the useState function
    const [error, setError] = useState(null);
    //create a variable called [updatedUser, setUpdatedUser] and set it to the useState function
    const [updatedUser, setUpdatedUser] = useState({});
    //create a variable called [updated, setUpdated] and set it to the useState function
    const [updated, setUpdated] = useState(false);
    //create a variable called [cancel, setCancel] and set it to the useState function
    const [cancel, setCancel] = useState(false);
    //create a variable called [firstName, setFirstName] and set it to the useState function
    const [firstName, setFirstName] = useState("");
    //create a variable called [email, setEmail] and set it to the useState function
    const [email, setEmail] = useState("");
    //create a variable called [mobileNumber, setMobileNumber] and set it to the useState function
    const [mobileNumber, setMobileNumber] = useState("");
    //create a variable called [password, setPassword] and set it to the useState function
    const [password, setPassword] = useState("");
    //create a variable called [confirmPassword, setConfirmPassword] and set it to the useState function
    const [confirmPassword, setConfirmPassword] = useState("");
    //create a variable called [isAdmin, setIsAdmin] and set it to the useState function
    const [isAdmin, setIsAdmin] = useState(false);
    //create a variable called [isOwner, setIsOwner] and set it to the useState function
    const [isOwner, setIsOwner] = useState(false);
    //create a variable called [isUser, setIsUser] and set it to the useState function
    const [isUser, setIsUser] = useState(false);
    //create a variable called [isDisabled, setIsDisabled] and set it to the useState function
    const [isDisabled, setIsDisabled] = useState(true);

}

//create a useEffect function
useEffect(() => {
    //create a try/catch block
    try {
        //create a variable called response and set it to the readUser function
        const response = readUser(userId);
        //create a variable called user and set it to the user property of the response object
        const user = response.user;
        //create a variable called firstName and set it to the first_name property of the user object
        const firstName = user.first_name;
        //create a variable called email and set it to the email property of the user object
        const email = user.email;
        //create a variable called mobileNumber and set it to the mobile_number property of the user object
        const mobileNumber = user.mobile_number;
        //create a variable called password and set it to the password property of the user object
        const password = user.password;
        //create a variable called confirmPassword and set it to the confirm_password property of the user object
        const confirmPassword = user.confirm_password;
        //create a variable called isAdmin and set it to the is_admin property of the user object
        const isAdmin = user.is_admin;
        //create a variable called isOwner and set it to the is_owner property of the user object
        const isOwner = user.is_owner;
        //create a variable called isUser and set it to the is_user property of the user object
        const isUser = user.is_user;
        //create a variable called isDisabled and set it to the is_disabled property of the user object
        const isDisabled = user.is_disabled;
        //set the user state to the user object
        setUser(user);
        //set the firstName state to the firstName variable
        setFirstName(firstName);
        //set the email state to the email variable
        setEmail(email);
        //set the mobileNumber state to the mobileNumber variable
        setMobileNumber(mobileNumber);
        //set the password state to the password variable
        setPassword(password);
        //set the confirmPassword state to the confirmPassword variable
        setConfirmPassword(confirmPassword);
        //set the isAdmin state to the isAdmin variable
        setIsAdmin(isAdmin);
        //set the isOwner state to the isOwner variable
        setIsOwner(isOwner);
        //set the isUser state to the isUser variable
        setIsUser(isUser);
        //set the isDisabled state to the isDisabled variable
        setIsDisabled(isDisabled);
    }
    //create a catch block
    catch (error) {
        //set the error state to the error object
        setError(error);
    }
}, [userId]);
//create a useEffect function
useEffect(() => {
    //create a try/catch block
    try {
        //create a variable called response and set it to the updateUser function
        const response = updateUser(userId, updatedUser);
        //create a variable called user and set it to the user property of the response object
        const user = response.user;
        //set the user state to the user object
        setUser(user);
        //set the updated state to true
        setUpdated(true);
        //set the cancel state to true
        setCancel(true);
        //set the history state to the /admin/users path
        history.push("/admin/users");
    }

    //create a catch block
    catch (error) {
        //set the error state to the error object
        setError(error);
    }
}, [updatedUser]);
//create a function called handleCancel
const handleCancel = () => {
    //set the cancel state to true
    setCancel(true);
    //set the history state to the /admin/users path
    history.push("/admin/users");
}
//create a function called handleUpdate
const handleUpdate = () => {
    //create a variable called updatedUser and set it to an object
    const updatedUser = {
        //set the first_name property to the firstName state
        first_name: firstName,
        //set the email property to the email state
        email: email,
        //set the mobile_number property to the mobileNumber state
        mobile_number: mobileNumber,
        //set the password property to the password state
        password: password,
        //set the confirm_password property to the confirmPassword state
        confirm_password: confirmPassword,
        //set the is_admin property to the isAdmin state
        is_admin: isAdmin,
        //set the is_owner property to the isOwner state
        is_owner: isOwner,
        //set the is_user property to the isUser state
        is_user: isUser,
        //set the is_disabled property to the isDisabled state
        is_disabled: isDisabled
    }
    //set the updatedUser state to the updatedUser object
    setUpdatedUser(updatedUser);
}
//create a function called handleFirstNameChange
const handleFirstNameChange = (event) => {
    //set the firstName state to the value property of the event object
    setFirstName(event.target.value);
}
//create a function called handleLastNameChange
const handleLastNameChange = (event) => {
    //set the lastName state to the value property of the event object
    setLastName(event.target.value);
}
//create a function called handleEmailChange
const handleEmailChange = (event) => {
    //set the email state to the value property of the event object
    setEmail(event.target.value);
}
//create a function called handleMobileNumberChange
const handleMobileNumberChange = (event) => {
    //set the mobileNumber state to the value property of the event object
    setMobileNumber(event.target.value);
}
//create a function called handlePasswordChange
const handlePasswordChange = (event) => {
    //set the password state to the value property of the event object
    setPassword(event.target.value);
}
//create a function called handleConfirmPasswordChange
const handleConfirmPasswordChange = (event) => {
    //set the confirmPassword state to the value property of the event object
    setConfirmPassword(event.target.value);
}
//create a function called handleIsAdminChange
const handleIsAdminChange = (event) => {
    //set the isAdmin state to the checked property of the event object
    setIsAdmin(event.target.checked);
}
//create a function called handleIsOwnerChange
const handleIsOwnerChange = (event) => {
    //set the isOwner state to the checked property of the event object
    setIsOwner(event.target.checked);
}
//create a function called handleIsUserChange
const handleIsUserChange = (event) => {
    //set the isUser state to the checked property of the event object
    setIsUser(event.target.checked);
}
//create a function called handleIsDisabledChange
const handleIsDisabledChange = (event) => {
    //set the isDisabled state to the checked property of the event object
    setIsDisabled(event.target.checked);
}
//create a function called handleDelete
const handleDelete = () => {
    //create a try/catch block
    try {
        //create a variable called response and set it to the deleteUser function
        const response = deleteUser(userId);
        //set the history state to the /admin/users path
        history.push("/admin/users");
    }
    //create a catch block
    catch (error) {
        //set the error state to the error object
        setError(error);
    }
}

//return the form components
return (
    <div className="container">    
        <div className="row">
            <div className="col-12">
                <h1 className="text-center">Update User</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <form>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" id="firstName" value={firstName} onChange={handleFirstNameChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobileNumber">Mobile Number</label>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="mobileNumber" value={mobileNumber} onChange={handleMobileNumberChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="isAdmin">Is Admin</label>
                    </div>
                    <div className="form-group">
                        <input type="checkbox" className="form-control" id="isAdmin" checked={isAdmin} onChange={handleIsAdminChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="isOwner">Is Owner</label>
                    </div>
                    <div className="form-group">
                        <input type="checkbox" className="form-control" id="isOwner" checked={isOwner} onChange={handleIsOwnerChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="isUser">Is User</label>
                    </div>
                    <div className="form-group">
                        <input type="checkbox" className="form-control" id="isUser" checked={isUser} onChange={handleIsUserChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="isDisabled">Is Disabled</label>
                    </div>
                    <div className="form-group">
                        <input type="checkbox" className="form-control" id="isDisabled" checked={isDisabled} onChange={handleIsDisabledChange} />
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update</button>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);


//export the components
export default UpdateUser;