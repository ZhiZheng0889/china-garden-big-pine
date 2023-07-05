import React, { useState } from "react";
import FormInput from "../FormInput/FormInput";
import ButtonPrimary from "../../Button/ButtonPrimary/ButtonPrimary";
import ButtonLight from "../../Button/ButtonLight/ButtonLight";

const FormEditableField = ({
  state,
  setState,
  name,
  label,
  initialIsEditable = false,
  id,
  placeholder,
  className,
  usePhoneInput = false,
}) => {
  const [isEditable, setIsEditable] = useState(initialIsEditable);
  const [inputValue, setInputValue] = useState(state);

  const toggleEditable = () => {
    setIsEditable((curr) => !curr);
  };

  const changeInput = ({ target: { value } }) => {
    setInputValue(value);
  };

  const saveField = () => {
    setState(inputValue);
    setIsEditable(false);
  };

  const cancelFieldChange = () => {
    setState(state);
    setIsEditable(false);
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {isEditable ? (
        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor={name} className="capitalize">
              {name}
            </label>
            {usePhoneInput ? (
              <FormPhoneInput
                state={inputValue}
                setState={setState}
                placeholder={placeholder}
                className="w-full"
              />
            ) : (
              <FormInput
                state={inputValue}
                onChange={changeInput}
                placeholder={placeholder}
                className="w-full"
              />
            )}
          </div>

          <div className="flex gap-2">
            <ButtonPrimary className="w-20" onClick={saveField}>
              Confirm
            </ButtonPrimary>
            <ButtonLight className="w-20" onClick={cancelFieldChange}>
              Cancel
            </ButtonLight>
          </div>
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          <p className={`flex-1 border-b ${state ? "p-2" : "p-3.5"}`}>
            {state}
          </p>
          <button
            className="border rounded w-10 h-10 flex items-center justify-center duration-200 ease-out hover:bg-neutral-100 active:bg-neutral-200 focus:outline outline-2 outline-offset-2 outline-red-600"
            onClick={toggleEditable}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default FormEditableField;
