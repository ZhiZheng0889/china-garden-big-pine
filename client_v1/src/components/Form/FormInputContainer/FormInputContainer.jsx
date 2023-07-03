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
  spacing = "gap-5",
  placeholder,
}) => {
  return (
    <div className={`flex flex-col ${className} ${labelClassName} ${spacing}`}>
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
