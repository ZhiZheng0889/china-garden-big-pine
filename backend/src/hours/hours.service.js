const fs = require("fs").promises;
const Closed = require("../db/models/closedModel");
const path = require("path");

async function getOperationHours() {
  const hours = await fs.readFile(
    path.resolve(__dirname, "../db/data/hours.json"),
    "utf-8"
  );
  console.log("hours: ", hours);
  return JSON.parse(hours);
}

function getClosedHours(date) {
  return Closed.findOne({ date }).exec();
}

module.exports = {
  getOperationHours,
  getClosedHours,
};
