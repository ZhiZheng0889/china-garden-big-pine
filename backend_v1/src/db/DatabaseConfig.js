const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const getDatabaseUri = (NODE_ENV) => {
  console.log(NODE_ENV, "<==");
  const databaseType =
    NODE_ENV === "test" ? "DATABASE_URL_TEST" : "DATABASE_URL";
  console.log(process.NODE_ENV);
  return process.env[databaseType];
};

const DatabaseConfig = {
  getDatabaseUri,
};

Object.freeze(DatabaseConfig);

module.exports = DatabaseConfig;
