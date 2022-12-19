import React from 'react';
import Input from './Input/Input';
import styles from './Form.module.css';
/*
 * Form component that is created from an object.
 *
 * Params:
 * @data: object used to create the form
 * @children: additional inputs that are not a part of the original object
 * @submitText: change the text value of the submit form
 * @footer: append a react element at the footer of the form
 */
const Form = ({ data, onChange, onSubmit, submitText, children, footer }) => {
  const inputElements = [];
  // Pattersn and titles for form validation
  const emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  const emailTitle = 'Enter valid email address';
  const passwordPattern =
    '"^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$"';
  const passwordTitle =
    'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character';
  for (const item in data) {
    const value = data[item] || '';
    let type = '';
    let pattern = '';
    let title = '';
    if (item === 'password') {
      type = 'password';
      pattern = passwordPattern;
      title = passwordTitle;
    }
    if (item === 'email') {
      type = 'email';
      pattern = emailPattern;
      title = emailTitle;
    }
    const inputElement = (
      <Input
        name={item}
        value={value}
        label={item}
        placeholder={item}
        onChange={onChange}
        type={type}
        pattern={pattern}
        title={title}
        key={item}
      />
    );
    inputElements.push(inputElement);
  }
  return (
    <form onSubmit={onSubmit}>
      {inputElements}
      {children}
      <button
        type="submit"
        className={`button button-primary ${styles.button}`}
      >
        {submitText}
      </button>
      {footer}
    </form>
  );
};

Form.defaultProps = {
  submitText: 'Submit',
};

export default Form;
