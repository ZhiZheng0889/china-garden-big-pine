import React from 'react';
import styles from './SpecialRequest.module.css';
const SpecialRequest = ({ specialRequest, setSpecialRequest }) => {
  console.log(specialRequest);
  // create ability to fill out special requests
  function handler(event) {
    const { value } = event.target;
    if (specialRequest.length <= 299) {
      setSpecialRequest(value);
    }
  }
  return (
    <>
      <h3 className="modal-header">Special Request</h3>
      <form className={styles.form}>
        <p className={styles.description}>
          **NOTE EXTRA CHARGES MAY BE INCURRED FOR ADDITIONS IN THIS SECTION.
          PLEASE INCLUDE THE AMOUNT BY $ FOR ADDING MORE INGREDIENT TO A DISH.**
        </p>
        <textarea
          value={specialRequest}
          onChange={handler}
          className={styles.textArea}
          id="specialRequest"
          name="specialRequest"
          placeholder="Special Request..."
        ></textarea>
      </form>
    </>
  );
};

export default SpecialRequest;
