import React, { useEffect, useState } from "react";
import { formatCost } from "../../../utils/formatCost";
import { snakeToTitleCase } from "../../../utils/snakeToTitleCase";
import styles from "./ModalOptions.module.css";
const ModalOptions = ({ options, selectedOption, setSelectedOption }) => {
  const changeCurrentOption = ({ target }) => {
    if (target.getAttribute("data-id")) {
      setSelectedOption(parseInt(target.getAttribute("data-id")));
    }
  };
  return options.length > 0 ? (
    <>
      <form className={styles.form}>
        <fieldset className={styles.fieldset}>
          <legend>
            <h3 className="text-lg font-semibold mb-2">Options</h3>
          </legend>
          {options.map((option, index) => {
            return (
              <div
                id={option.option + index}
                data-id={index}
                className={styles.div}
                onClick={changeCurrentOption}
              >
                <input
                  type="radio"
                  id={option.option + index}
                  data-id={index}
                  name="option"
                  className={`${styles.input}  focus:outline outline-2 outline-offset-2 outline-red-600`}
                  onChange={changeCurrentOption}
                  checked={selectedOption === index}
                />
                <label
                  htmlFor={option.option + index}
                  className={styles.label}
                  onClick={changeCurrentOption}
                  data-id={index}
                >
                  {snakeToTitleCase(option.option)}
                </label>
                <p
                  className={styles.price}
                  onClick={changeCurrentOption}
                  data-id={index}
                >
                  {"+ $" + formatCost(option.upcharge)}
                </p>
              </div>
            );
          })}
        </fieldset>
      </form>
    </>
  ) : null;
};

ModalOptions.defaultProps = {
  description: "Choose 1",
};

export default ModalOptions;
