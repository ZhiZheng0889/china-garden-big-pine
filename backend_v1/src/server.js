const { PORT = 5000, NODE_ENV } = process.env;
const mongoose = require("mongoose");
const app = require("./app");
const DatabaseConfig = require("./db/DatabaseConfig");
const DatabaseManager = require("./db/DatabaseManager");

DatabaseManager.connect(DatabaseConfig.getDatabaseUri(NODE_ENV))
  .then((ans) => {
    console.log("DB connection is successful 🚀");
    app.listen(PORT, listener);
  })
  .catch((error) => {
    console.log("💣😑 What Happened");
    console.error(error);
  });

function listener() {
  console.log(`Listening on Port ${PORT}!`);
}
