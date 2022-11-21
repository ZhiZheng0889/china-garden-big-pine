import React, { useEffect, useState } from 'react';
import styles from './ModalOptions.module.css';
const ModalOptions = ({
  title,
  description,
  options,
  optionType,
  price,
  setTotal,
  setSelectedOptions,
  quantity,
}) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const changeOption = ({ target }) => {
    const { id } = target;
    setSelectedOption(id);
  };

  useEffect(() => {
    const index = options.indexOf(selectedOption);
    const tempObj = {};
    tempObj[optionType] = selectedOption;
    setSelectedOptions((curr) => {
      return {
        ...curr,
        ...tempObj,
      };
    });
    setTotal((price[index] || price[0]) * quantity);
  }, [selectedOption]);
  if (Array.isArray(options) && options.length > 0) {
    return (
      <>
        <form className={styles.form}>
          <fieldset className={styles.fieldSet}>
            <legend>
              <h3 className="modal-header">{title}</h3>
            </legend>
            {/* <p className={styles.description}>{description}</p> */}
            {options.map((option, index) => {
              const label = option[0].toUpperCase() + option.slice(1);
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
                    checked={selectedOption === option}
                  />
                  <label htmlFor={option} className={styles.label}>
                    {label}
                  </label>
                  <p className={styles.price}>
                    {Array.isArray(price) && '+ $' + price[index]}
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
