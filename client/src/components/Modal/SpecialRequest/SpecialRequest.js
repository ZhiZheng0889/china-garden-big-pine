import React from 'react';
import styles from './SpecialRequest.module.css';
const SpecialRequest = ({specialRequest, setSpecialRequest}) => {
  // create ability to fill out special requests
  function handler(event){
    const {value}= event.target;
    setSpecialRequest(value);
  }
  ;
  return (
    <div className="mt20">
      <label for="item_special_instructions" id="special_instructions_label">
        Special instructions :
      </label>
      <p class="description">
        NOTE EXTRA CHARGES MAY BE INCURRED FOR ADDITIONS IN THIS SECTION. 
        PLEASE INCLUDE THE AMOUNT BY $ FOR ADDING MORE INGREDIENT TO A DISH.
      </p>
      <form id='form' method='post'>
      <textarea
        value={specialRequest}
        onChange={handler}
        class="mb10"
        rows={10}
        cols={60}
        name="param_special~instructions_s_n_500"
        id="item_special_instructions"
        maxlength="500"
      ></textarea>
      </form>
    </div>
  );
};

export default SpecialRequest;
