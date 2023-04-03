const { PORT = 5000 } = process.env;
const mongoose = require("mongoose");
const app = require("./app");
const DatabaseConfig = require("./db/config");

mongoose
  .connect(DatabaseConfig.getDatabaseUri())
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
