const fs = require("fs");
const USER_DATA = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
const Seeder = require('./Seeder.js');
const User = require("../models/userModel");
async function seed(env) {
    await Seeder.inject(USER_DATA, User, env)
}

async function reap(env) {
    await Seeder.delete(User, env);
}

module.exports = {
    seed, reap
}