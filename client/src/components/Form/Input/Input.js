import React from 'react';
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
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        onChange={onChange}
        value={value}
        type={type}
        name={name}
        placeholder={placeholder}
        required={false}
      />
    </div>
  );
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
