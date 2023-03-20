const User = require("../models/userModel");
const { Seeder } = require("./Seeder");

function seed() {
  const seeder = new Seeder(`${__dirname}/users.json`, User);
}

function destroy() {}

if (process.argv[2] === "--import") {
  seed();
} else if (process.argv[2] === "--delete") {
  destroy();
}
