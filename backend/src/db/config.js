const mongoose = require("mongoose");
require("dotenv").config();

class DatabaseConfig {
  static getDatabaseUri(env) {
    if (env === "production") {
      return process.env.DATABASE_URL || "";
    } else if (env === "test") {
      return process.env.DATABASE_URL_TEST || "";
    } else {
      return process.env.DATABASE_URL_DEVELOPMENT || "";
    }
  }

  static getDatabaseUriForTest() {
    return this.getDatabaseUri("test");
  }

  static init(env) {
    mongoose.connect(this.getDatabaseUri(env), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    const db = mongoose.connection;
    db.on("error", (error) => {
      console.log(error);
    });

    db.once("connected", () => {
      console.log("Database Connected");
    });
  }
}

module.exports = DatabaseConfig;
