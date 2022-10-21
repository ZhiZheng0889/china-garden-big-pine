import React from 'react';
import styles from './SpecialRequest.module.css';
const SpecialRequest = () => {
  // create ability to fill out special requests
  return (
    <div class="mt20">
      <label for="item_special_instructions" id="special_instructions_label">
        Special instructions :
      </label>
      <p class="description">
        NOTE EXTRA CHARGES MAY BE INCURRED FOR ADDITIONS IN THIS SECTION. 
        PLEASE INCLUDE THE AMOUNT BY $ FOR ADDING MORE INGREDIENT TO A DISH.
      </p>
      <form id='form' method ="POST" action =''>
      <textarea
        class="mb10"
        rows={10}
        cols={40}
        name="param_special~instructions_s_n_500"
        id="item_special_instructions"
        maxlength="500"
      ></textarea>
      </form>
    </div>
  );
};

export default SpecialRequest;
