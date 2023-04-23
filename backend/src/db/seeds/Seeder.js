const mongoose = require("mongoose");

const DatabaseConfig = require("../config");

class Seeder {
  static async connect(env) {
    let URI = DatabaseConfig.getDatabaseUri(env);
    mongoose
      .connect(URI)
      .then((con) => console.log("DB connection successful!"))
      .catch((err) => console.log("OH NO SOMETHING WENT WRONG ", err.message));
  }

  static async inject(data, model, env) {
    try {
      await this.connect(env);
      await model.create(data);
      console.log("Data successfully injected!");
    } catch (error) {
      // console.error("ERROR: ", error);
      console.error("There was an error: ", error.message);
    }
  }

  static async delete(model, env) {
    try {
      this.connect(env);
      await model.deleteMany();
      console.log("Data successfully deleted!");
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Seeder;
