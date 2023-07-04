import React from "react";

const FormInput = ({
  state,
  onChange,
  className = "",
  padding = "p-2",
  id = "",
  name = "",
  placeholder,
  isInvalid,
}) => {
  return (
    <input
      value={state}
      onChange={onChange}
      id={id}
      name={name}
      placeholder={placeholder}
      className={`${className} ${padding} border rounded focus:outline outline-2 outline-offset-2 outline-red-600 ${
        isInvalid && "bg-red-100 border-red-700 text-red-700"
      }`}
    />
  );
};

export default FormInput;
