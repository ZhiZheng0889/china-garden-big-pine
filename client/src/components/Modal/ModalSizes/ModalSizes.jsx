import React from "react";
import { formatCost } from "../../../utils/formatCost";
import styles from "./ModalSizes.module.css";
const ModalSizes = ({ sizes, setSelectedSize, selectedSize }) => {
  const changeCurrentSize = ({ target }) => {
    if (target.getAttribute("data-id")) {
      setSelectedSize(parseInt(target.getAttribute("data-id")));
    }
  };
  return sizes.length > 0 ? (
    <>
      <form className={styles.form}>
        <fieldset className={styles.fieldset}>
          <legend>
            <h3 className="text-lg font-semibold mb-2">Sizes</h3>
          </legend>
          {sizes.map((size, index) => {
            return (
              <div
                id={size.size + index}
                data-id={index}
                className={styles.div}
                onClick={changeCurrentSize}
              >
                <input
                  type="radio"
                  id={size.size + index}
                  data-id={index}
                  name="size"
                  className={styles.input}
                  onChange={changeCurrentSize}
                  checked={selectedSize === index}
                />
                <label
                  htmlFor={size.size + index}
                  className={styles.label}
                  onClick={changeCurrentSize}
                  data-id={index}
                >
                  {size.size}
                </label>
                <p
                  className={styles.price}
                  onClick={changeCurrentSize}
                  data-id={index}
                >
                  {"+ $" + formatCost(size.upcharge)}
                </p>
              </div>
            );
          })}
        </fieldset>
      </form>
    </>
  ) : null;
};

export default ModalSizes;
