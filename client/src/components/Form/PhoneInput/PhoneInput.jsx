import React from "react";

const formatPhoneNumber = (value) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const { length } = phoneNumber;
  if (length < 4) {
    return phoneNumber;
  }
  if (length < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}`;
};

const PhoneInput = ({ state, setState, id }) => {
  const changePhoneNumber = ({ target: { value } }) => {
    setState(formatPhoneNumber(value));
  };
  return (
    <input
      id={id}
      type="tel"
      value={state}
      onChange={changePhoneNumber}
      className="w-full p-2 border rounded focus:outline outline-2 outline-offset-2 outline-red-600"
    />
  );
};

export default PhoneInput;
