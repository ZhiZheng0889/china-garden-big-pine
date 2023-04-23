const { default: mongoose } = require("mongoose");
const Food = require("../src/db/models/foodModel");
const { seedAll, reapAll } = require("../src/db/seeds/dataProvider");
const DatabaseConfig = require("../src/db/config");

module.exports = class DatabaseManager {
  static async dropAll() {
    await reapAll("test");
  }
  static async seedAll() {
    await seedAll("test");
  }

  static async listFoods() {
    await mongoose.connect(DatabaseConfig.getDatabaseUri("test"));
    return await Food.find();
  }
};
