import React from "react";
import FormInput from "../FormInput/FormInput";
import PhoneInput from "../FormPhoneInput/FormPhoneInput";

const FormInputContainer = ({
  state,
  inputClassName,
  inputPadding,
  children,
  className,
  inputId,
  setState,
  name,
  labelClassName = "",
  spacing = "gap-1",
  isRequired,
  placeholder,
  usePhoneInput = false,
  isInvalid,
}) => {
  const onChange = ({ target: { value } }) => {
    setState(value);
  };
  return (
    <div className={`flex flex-col ${className} ${labelClassName} ${spacing}`}>
      <label
        htmlFor={inputId}
        className={`capitalize${
          isRequired && " after:content-['*'] after:text-red-700 after:ml-1"
        }`}
      >
        {name}
      </label>
      {usePhoneInput ? (
        <PhoneInput
          state={state}
          name={name}
          setState={setState}
          id={inputId}
          placeholder={placeholder}
          isInvalid={isInvalid}
        />
      ) : (
        <FormInput
          state={state}
          onChange={onChange}
          className={`${inputClassName} w-full`}
          padding={inputPadding}
          id={inputId}
          name={name}
          placeholder={placeholder}
          isInvalid={isInvalid}
        />
      )}
      {children}
    </div>
  );
};

export default FormInputContainer;
