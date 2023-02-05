import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

/**
 * UserEditScreen
 * 
 * Allows the user to edit an existing user's details. 
 * It receives `match` and `history` props from React Router, 
 * which are used to extract the `userId` from the URL and 
 * to navigate to the user list page after a successful update.
 * 
 * @param {Object} match - Object containing information about how the Route pattern matched the URL
 * @param {Object} history - Object containing information about browser history
 * @returns {JSX.Element} - Returns JSX for the UserEditScreen component
 */
const UserEditScreen = ({ match, history }) => {
  // Extract the userId from the match params
  const userId = match.params.id;

  // State for storing the user's name, email, and admin status
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Dispatch hook for dispatching actions to the Redux store
  const dispatch = useDispatch();

  // Selectors for accessing the userDetails and userUpdate states from the Redux store
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  /**
   * useEffect hook to fetch the user details when the component is first rendered,
   * and to update the form fields with the current user details. It also listens
   * for changes in the `successUpdate` state, and redirects the user to the user list page
   * if a successful update is detected.
   */
  useEffect(() => {
    if (successUpdate) {
      // reset the successUpdate state
      dispatch({ type: USER_UPDATE_RESET });
      // redirect to user list page
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        // Fetch the user details if not already fetched
        dispatch(getUserDetails(userId));
      } else {
        // Update the form fields with the current user details
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };
/**
The form uses react-bootstrap library for form components, Form, Form.Group, Form.Control, Form.Label and Form.Check.
It also uses FormContainer, Loader and Message component which is imported from ../../components directory.
The loadingUpdate state variable is used to show the loading spinner when the update is in progress 
and errorUpdate state variable is used to show the error message when there is an error in update.

It uses onChange event handler to update the state variable values when the user inputs something in the form fields.
On submit, it triggers the submitHandler function which is responsible for handling the form submission 
and updating the user information.
 */
  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
