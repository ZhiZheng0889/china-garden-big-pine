import React from "react";
import FormInput from "../FormInput/FormInput";

const FormInputContainer = ({
  state,
  inputClassName,
  inputPadding,
  children,
  className,
  inputId,
  onChange,
  name,
  labelClassName = "",
  spacing = "mb-3",
  placeholder,
}) => {
  return (
    <div className={`${className} ${labelClassName} ${spacing}`}>
      <label htmlFor={inputId}>{name}</label>
      <FormInput
        state={state}
        onChange={onChange}
        className={`${inputClassName} w-full`}
        padding={inputPadding}
        id={inputId}
        name={name}
        placeholder={placeholder}
      />
      {children}
    </div>
  );
};

export default FormInputContainer;
