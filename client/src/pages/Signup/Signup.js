import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import ErrorAlert from '../../errors/ErrorAlert';
import styles from './Signup.module.css';
import { UserApi } from '../../api/userApi';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input/Input';
const Signup = ({ setUser }) => {
  const [signup, setSignup] = useState({
    email: '',
    username: '',
    first_name: '',
    phone_number: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [buttonText, setButtonText] = useState('Continue');
  const onChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'passwordConfirm') {
      setConfirmPassword(value);
    } else {
      setSignup({
        ...signup,
        [name]: value,
      });
    }
  };
  const footerText = (
    <p className={styles.footer}>
      Already have an account? <Link to="/login">Sign in here</Link>
    </p>
  );
  const onSubmit = async (event) => {
    console.log('in here!');
    setError(null);
    event.preventDefault();
    setButtonText('Loading...');
    try {
      if (signup.password === confirmPassword) {
        console.log(signup);
        const payload = {
          ...signup,
          isAdmin: false,
        };
        const response = await UserApi.signup(payload);
        if (response) {
          console.log('res: ', response);
          setUser(response);
          redirect('/');
        }
      } else {
        throw { message: 'Passwords are not matching. Please try again.' };
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setButtonText('Continue');
    }
  };
  return (
    <div className={styles.container}>
      {error && <ErrorAlert error={error} />}
      <h1 className={styles.title}>China Garden</h1>
      <Form
        data={signup}
        onChange={onChange}
        onSubmit={onSubmit}
        footer={footerText}
        submitText={buttonText}
      >
        <Input
          onChange={onChange}
          value={confirmPassword}
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          label="Confirm Password"
        />
      </Form>
    </div>
  );
};

export default Signup;
