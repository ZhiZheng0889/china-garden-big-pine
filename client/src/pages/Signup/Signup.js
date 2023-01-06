import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import ErrorAlert from '../../errors/ErrorAlert';
import { UserApi } from '../../api/userApi';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input/Input';
import Card from '../../components/Card/Card';
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
    <p className="mt-2">
      Already have an account?{' '}
      <Link to="/login" className="text-red-900">
        Sign in here
      </Link>
    </p>
  );
  const onSubmit = async (event) => {
    setError(null);
    event.preventDefault();
    setButtonText('Loading...');
    try {
      if (signup.password === confirmPassword) {
        const payload = {
          ...signup,
          isAdmin: false,
        };
        const response = await UserApi.signup(payload);
        if (response) {
          setUser(response);
          redirect('/');
        }
      } else {
        throw { message: 'Passwords are not matching. Please try again.' };
      }
    } catch (error) {
      setError(error);
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
      </Card>
    </div>
  );
};

export default Signup;
