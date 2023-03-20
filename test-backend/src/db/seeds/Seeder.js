const mongoose = require("mongoose");
const fs = require("fs");
const DatabaseConfig = require("../config");

class Seeder {
  static async connect() {
    const URI = DatabaseConfig.getDatabaseUri();
    mongoose
      .connect(URI)
      .then((con) => console.log("DB connection successful!", con.connection))
      .catch((err) => console.log("OH NO SOMETHING WENT WRONG ", err));
  }

  static async inject(file, model) {
    try {
      await this.connect();
      const data = JSON.parse(fs.readFileSync(file, "utf-8"));
      await model.create(data);
      console.log("Data successfully injected!");
    } catch (error) {
      console.error("ERROR: ", error);
    }
  }

  static async delete(model) {
    try {
      this.connect();
      await model.deleteMany();
      console.log("Data successfully deleted!");
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Seeder;
