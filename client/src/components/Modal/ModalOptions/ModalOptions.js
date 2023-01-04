import React, { useEffect, useState } from 'react';
import { snakeToTitleCase } from '../../../utils/snakeToTitleCase';
import styles from './ModalOptions.module.css';
const ModalOptions = ({
  title,
  description,
  options,
  optionType,
  selectedOption,
  setSelectedOption,
}) => {
  const changeOption = ({ target }) => {
    const { id } = target;
    setSelectedOption({ option: id, ...options[id] });
  };
  if (Object.keys(options).length > 0) {
    return (
      <>
        <form className={styles.form}>
          <fieldset className={styles.fieldSet}>
            <legend>
              <h3 className="text-lg font-semibold">{title}</h3>
            </legend>
            {/* <p className={styles.description}>{description}</p> */}
            {Object.keys(options).map((option) => {
              const label = snakeToTitleCase(option);
              return (
                <div
                  key={option}
                  className={styles.div}
                  onClick={changeOption}
                  id={option}
                >
                  <input
                    type="radio"
                    id={option}
                    name="option"
                    className={styles.input}
                    onChange={changeOption}
                    checked={selectedOption && selectedOption.option === option}
                  />
                  <label htmlFor={option} className={styles.label}>
                    {label}
                  </label>
                  <p className={styles.price}>
                    {'+ $' + options[option].upCharge}
                  </p>
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
