import React from "react";
import { snakeToTitleCase } from "../../../utils/snakeToTitleCase";
import styles from "./Input.module.css";

const Input = ({
  onChange,
  value,
  type,
  placeholder,
  label,
  name,
  title,
  pattern,
}) => {
  const preventPropagation = (event) => {
    event.stopPropagation();
  };
  const formattedLabel =
    label.indexOf("_") > -1 ? snakeToTitleCase(label) : label;
  const formattedPlaceholder =
    placeholder.indexOf("_") > -1 ? snakeToTitleCase(placeholder) : placeholder;
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={label} className="capitalize mb-2">
        {formattedLabel}
      </label>
      <input
        id={label}
        onChange={onChange}
        onClick={preventPropagation}
        value={value}
        type={type}
        name={name}
        placeholder={formattedPlaceholder}
        required={false}
        className="p-2 border rounded focus:outline outline-2 outline-offset-2 outline-red-600"
      />
    </div>
  );
};

Input.defaultProps = {
  type: "text",
};

export default Input;
