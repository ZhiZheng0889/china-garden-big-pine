const { PORT = 5000 } = process.env;
const mongoose = require("mongoose");
const app = require("./app");
const DatabaseConfig = require("./db/config");
const { NODE_ENV } = process.env;
console.log("NODE_ENV: ", NODE_ENV);
console.log("DBURI: ", DatabaseConfig.getDatabaseUri(NODE_ENV));
mongoose
  .connect(DatabaseConfig.getDatabaseUri(NODE_ENV))
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
