import React from 'react';

const Form = ({ data, handleSubmit, children }) => {
  const dataInputs = Object.keys(data);
  return <form onSubmit={handleSubmit}></form>;
};

export default Form;
