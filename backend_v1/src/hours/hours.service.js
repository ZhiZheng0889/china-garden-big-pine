const fs = require("fs").promises;
const Holiday = require("../db/models/holidayModel");
const path = require("path");

async function getOperationHours() {
  const hours = await fs.readFile(
    path.resolve(__dirname, "../db/data/hours.json"),
    "utf-8"
  );
  console.log(hours);
  return JSON.parse(hours);
}

function getClosedHours(date) {
  return Holiday.findOne({ date }).exec();
}

module.exports = {
  getOperationHours,
  getClosedHours,
};
