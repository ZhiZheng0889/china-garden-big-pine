import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorAlert from '../../errors/ErrorAlert';
import styles from './Login.module.css';
import { UserApi } from '../../api/userApi';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input/Input';
const Login = ({ setUser }) => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [buttonText, setButtonText] = useState('Login');
  const onChange = ({ target }) => {
    const { name, value } = target;
    setLogin({
      ...login,
      [name]: value,
    });
  };
  const footerText = (
    <p className={styles.footer}>
      Don't have an account? <Link to="/signup">Sign up here</Link>
    </p>
  );
  const onSubmit = async (event) => {
    setError(null);
    event.preventDefault();
    setButtonText('Loading...');
    try {
      const response = await UserApi.login(login);
      setUser(response);
    } catch (error) {
      console.log(error);
      setError({ message: error });
    } finally {
      setButtonText('Continue');
    }
  };
  return (
    <div className={styles.container}>
      {error && <ErrorAlert error={error} />}
      <h1 className={styles.title}>China Garden</h1>
      <Form
        data={login}
        onChange={onChange}
        onSubmit={onSubmit}
        footer={footerText}
        submitText={buttonText}
      />
    </div>
  );
};

export default Login;
