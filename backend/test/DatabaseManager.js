const { seedAll, reapAll } = require("../src/db/seeds/dataProvider");

module.exports = class DatabaseManager {
  static async dropAll() {
    await reapAll("test");
  }
  static async seedAll() {
    await seedAll("test");
  }
};
