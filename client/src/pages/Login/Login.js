import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorAlert from '../../errors/ErrorAlert';
import { UserApi } from '../../api/userApi';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input/Input';
import Card from '../../components/Card/Card';

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
    <p className="mt-2">
      Don't have an account?{' '}
      <Link to="/signup" className="text-red-900">
        Sign up here
      </Link>
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
      setError({ message: error });
    } finally {
      setButtonText('Continue');
    }
  };
  return (
    <div className="bg-slate-100 flex justify-center h-screen">
      <Card classes="w-[30rem] mt-4">
        {error && <ErrorAlert error={error} />}
        <h1 className="text-center text-2xl font-semibold">China Garden</h1>
        <Form
          data={login}
          onChange={onChange}
          onSubmit={onSubmit}
          footer={footerText}
          submitText={buttonText}
        />
      </Card>
    </div>
  );
};

export default Login;
