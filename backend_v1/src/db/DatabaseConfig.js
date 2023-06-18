const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const getDatabaseUri = (NODE_ENV) => {
  const databaseType =
    NODE_ENV === "test" ? "DATABASE_URL_TEST" : "DATABASE_URL";
  return process.env[databaseType];
};

const DatabaseConfig = {
  getDatabaseUri,
};

Object.freeze(DatabaseConfig);

module.exports = DatabaseConfig;
