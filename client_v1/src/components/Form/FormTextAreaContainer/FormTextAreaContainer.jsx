import React from "react";

const FormTextAreaContainer = ({ state, setState, id, name, placeholder }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="capitalize">
        {name}
      </label>
      <textarea
        value={state}
        onChange={({ target: { value } }) => setState(value)}
        id={id}
        row="3"
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded focus:outline outline-2 outline-offset-2 outline-red-600"
      ></textarea>
    </div>
  );
};

export default FormTextAreaContainer;
