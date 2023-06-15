const mongoose = require("mongoose");
const DatabaseConfig = require("./DatabaseConfig");
const connect = (dbUri) => {
  console.log(dbUri);
  if (!dbUri) {
    throw new Error(`Database uri provided: "${dbUri}" is no a valid uri`);
  }
  return mongoose.connect(dbUri);
};

const disconnect = () => {
  return mongoose.connection.close();
};

const seed = async (env, model, data) => {
  try {
    await connect(DatabaseConfig.getDatabaseUri(env));
    await model.create(data);
    console.log("Data successfully injected!");
  } catch (error) {
    throw new Error(error);
  }
};

const reap = async (env, model) => {
  try {
    await connect(env);
    await model.deleteMany();
    console.log("Data successfully deleted!");
  } catch (error) {
    throw new Error(error);
  }
};

const DatabaseManager = {
  connect,
  disconnect,
  seed,
  reap,
};

Object.freeze(DatabaseManager);

module.exports = DatabaseManager;
