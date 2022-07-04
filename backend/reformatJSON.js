'use strict';
const JSON = require('./src/db/seeds/01-foods.json');
const fs = require('fs');

const output = [];
let dishContainer;

for (const dish of JSON) {
  if (dish.size) {
    if (!dishContainer) {
      dishContainer = dish;
      dishContainer.size = [dish.size];
    } else {
      dishContainer.size.push(dish.size);
    }
  } else {
    if (dishContainer) {
      output.push(dishContainer);
      dishContainer = null;
    }
    output.push(dish);
  }
}

const jsonObj = JSON.parse(output);
const jsonContent = JSON.stringify(jsonObj);
fs.writeFile('01-foodsnew.json', jsonContent, 'utf8', function (err) {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    return console.log(err);
  }

  console.log('JSON file has been saved.');
});

console.log(output);
