import React, { useState } from 'react';
import Form from '../Form';
import Input from '../Input/Input';

const SignupForm = () => {
  const [signup, setSignup] = useState({
    email: '',
    phone_number: '',
    password: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Form data={signup} handleSubmit={handleSubmit}>
      {<Input type="password" id="confirm_password" />}
    </Form>
  );
};

export default SignupForm;
