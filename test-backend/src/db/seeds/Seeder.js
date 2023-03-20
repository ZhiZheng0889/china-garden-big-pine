import mongoose from "mongoose";
import fs from "fs";
import { DatabaseConfig } from "../config";

export class Seeder {
  connect() {
    const URI = DatabaseConfig.getDatabaseUri();
    mongoose
      .connect(URI)
      .then((con) => console.log("DB connection successful!", con.connection))
      .catch((err) => console.log("OH NO SOMETHING WENT WRONG ", err));
  }

  async inject() {
    try {
      this.connect();
      const data = JSON.parse(fs.readFileSync(this.file, "utf-8"));
      await this.model.create(data);
      console.log("Data successfully injected!");
    } catch (error) {
      console.error("ERROR: ", error);
    }
  }

  async delete() {
    try {
      this.connect();
      await this.model.deleteMany();
      console.log("Data successfully deleted!");
    } catch (error) {
      console.error(error);
    }
  }
}
