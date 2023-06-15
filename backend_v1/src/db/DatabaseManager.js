const mongoose = require("mongoose");

const connect = (dbUri) => {
  if (!dbUri) {
    throw new Error(`Database uri provided: "${dbUri}" is no a valid uri`);
  }
  return mongoose.connect(dbUri);
};

const disconnect = () => {
  return mongoose.connection.close();
};

const DatabaseManager = {
  connect,
  disconnect,
};

Object.freeze(DatabaseManager);

module.exports = DatabaseManager;
