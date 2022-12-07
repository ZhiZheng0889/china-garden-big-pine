'use strict';
const JSON = require('./src/db/seeds/00-foods.json');
const fs = require('fs');

const foodsArr = [];
const optionsArr = [];
const amountsArr = [];
const sizesArr = [];
JSON.forEach((food, index) => {
  const food_id = index + 1;
  // add amount
  if (food.amount) {
    const { amount } = food;
    const amountObj = {
      food_id,
      amount,
    };
    amountsArr.push(amountObj);
  } else {
    if (food.size) {
      const amounts = [];
      for (const key in food.size) {
        if (food.size[key].amount) {
          amounts.push({
            amount: food.size[key].amount,
            size: key,
          });
        }
      }
      amountsArr.push(...amounts);
    }
  }
  // add sizes
  if (food.size) {
    const sizes = [];
    for (const key in food.size) {
      const sizeObj = {
        food_id,
        size: key,
        upcharge: food.size[key].upcharge,
      };
      sizes.push(sizeObj);
    }
    sizesArr.push(...sizes);
  }
  // add options
  if (food.options) {
    const options = [];
    for (const key in food.options) {
      const optionsObj = {
        food_id,
        option: key,
        upcharge: food.options[key],
      };
      options.push(optionsObj);
    }
    optionsArr.push(...options);
  }
  const {
    name,
    base_price = 0,
    category,
    description = null,
    spicy = false,
    available = true,
  } = food;
  const foodObj = {
    name,
    base_price,
    category,
    description,
    spicy,
    available,
  };
  foodsArr.push(foodObj);
});
// console.log(amountsArr);
// console.log(sizesArr);
// console.log(optionsArr);
console.log(foodsArr.length);

// const writeToFile = (path, object) => {
//   const json = JSON.strin;
//   fs.writeFile(path, json, (err) => console.log(err));
// };

// writeToFile('./src/db/seeds/01-foodOptions.json', optionsArr);
// writeToFile('./src/db/seeds/02-foodAmounts.json', amountsArr);
// writeToFile('./src/db/seeds/03-foodSizes.json', sizesArr);

// const jsonObj = JSON.parse(output);
// const jsonContent = JSON.stringify(jsonObj);
// fs.writeFile('reformatJSONFile.json', jsonContent, 'utf8', function (err) {
//   if (err) {
//     console.log('An error occured while writing JSON Object to File.');
//     return console.log(err);
//   }

//   console.log('JSON file has been saved.');
// });

// const output = [];
// let dishContainer;

// for (const dish of JSON) {
//   if (dish.size) {
//     if (!dishContainer) {
//       dishContainer = dish;
//       dishContainer.size = [dish.size];
//     } else {
//       dishContainer.size.push(dish.size);
//     }
//   } else {
//     if (dishContainer) {
//       output.push(dishContainer);
//       dishContainer = null;
//     }
//     output.push(dish);
//   }
// }
