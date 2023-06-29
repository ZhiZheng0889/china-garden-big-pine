const DatabaseConfig = require("./DatabaseConfig");
const { seed, reap } = require("./seeds/foods");

async function seedData(env, provider) {
  console.log("ENV: ", env, provider);
  if (provider === "foods") {
    await seed(env);
  }
}

async function reapData(env, provider) {}

if (!process.argv[3]) {
  throw new Error("A enviroment is required");
}

if (process.argv[4]) {
  if (process.argv[2] === "--import") {
    seedData(process.argv[3], process.argv[4]);
  }
  if (process.argv[2] === "--delete") {
    reapData(process.argv[3], process.argv[4]);
  }
}
