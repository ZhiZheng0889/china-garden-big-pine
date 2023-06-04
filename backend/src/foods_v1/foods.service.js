const Food = require("../db/models/foodModel");


function list() {
  return Food.find();
}



module.exports = {
  list,
};
