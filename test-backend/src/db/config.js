import mongoose from "mongoose";
require("dotenv").config();

export class DatabaseConfig {
  static getDatabaseUri() {
    if (process.env.NODE_ENV === "production") {
      return process.env.DATABASE_URL || "";
    } else if (process.env.NODE_ENV === "test") {
      return process.env.DATABASE_URL_TEST || "";
    } else {
      return process.env.DATABASE_URL_DEVELOPMENT || "";
    }
  }

  static init() {
    mongoose.connect(this.getDatabaseUri());
    const db = mongoose.connection;
    db.on("error", (error) => {
      console.log(error);
    });

    db.once("connected", () => {
      console.log("Database Connected");
    });
  }
}
