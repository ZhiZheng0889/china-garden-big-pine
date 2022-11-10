import React from 'react';

const Input = ({ type }) => {
  return <input type={type} />;
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
