import React, { useState } from 'react';
import styles from './ModalOptions.module.css';
const ModalOptions = ({ title, description, options }) => {
  const [option, setOption] = useState(null);
  const changeOption = ({ target }) => {
    const { id } = target;
    setOption(id);
  };
  if (Array.isArray(options) && options.length > 0) {
    return (
      <>
        <form className={styles.form}>
          <fieldset className={styles.fieldSet}>
            <legend>
              <h3 className="modal-header">{title}</h3>
            </legend>
            {/* <p className={styles.description}>{description}</p> */}
            {options.map((option) => {
              const label = option[0].toUpperCase() + option.slice(1);
              return (
                <div key={option} className={styles.div}>
                  <input
                    type="radio"
                    id={option}
                    name="option"
                    className={styles.input}
                    onChange={changeOption}
                  />
                  <label htmlFor={option} className={styles.label}>
                    {label}
                  </label>
                </div>
              );
            })}
          </fieldset>
        </form>
      </>
    );
  }
  return null;
};

ModalOptions.defaultProps = {
  description: 'Choose 1',
};

export default ModalOptions;
