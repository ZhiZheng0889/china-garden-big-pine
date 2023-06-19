const fs = require('fs').promises;
const Closed = require("../db/models/closedModel");

function getOperationHours() {
    return JSON.parse(fs.readFile(path.resolve(__dirname, './src/db/data/hours.json'), 'utf-8'));
}

function getClosedHours(date) {
    return Closed.find({ date }).exec();
}

module.exports = {
    getOperationHours,
    getClosedHours
}