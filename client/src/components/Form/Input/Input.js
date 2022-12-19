import React from 'react';
import { snakeToTitleCase } from '../../../utils/snakeToTitleCase';
import styles from './Input.module.css';

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
  const formattedLabel =
    label.indexOf('_') > -1 ? snakeToTitleCase(label) : label;
  const formattedPlaceholder =
    placeholder.indexOf('_') > -1 ? snakeToTitleCase(placeholder) : placeholder;
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={label}>{formattedLabel}</label>
      <input
        id={label}
        onChange={onChange}
        value={value}
        type={type}
        name={name}
        placeholder={formattedPlaceholder}
        required={false}
      />
    </div>
  );
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
