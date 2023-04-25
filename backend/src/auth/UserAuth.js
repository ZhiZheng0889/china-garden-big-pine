const jwt = require("jsonwebtoken");
class UserAuth {
  TOKEN_KEY = process.env.TOKEN_KEY || null;
  ACCESS_TOKEN_TIMEOUT = "8h";
  REFRESH_TOKEN_TIMEOUT = "10d";
  static UserAuthInstance = null;

  constructor() {}

  static getInstance() {
    if (!this.UserAuthInstance) {
      this.UserAuthInstance = new UserAuth();
    }
    return this.UserAuthInstance;
  }

  authorize(token) {
    if (!this.TOKEN_KEY) {
      throw "Key is missing";
    }
    try {
      const data = jwt.verify(token, this.TOKEN_KEY);
      return data;
    } catch (error) {
      return error;
    }
  }

  async generateToken(data, expiresIn) {
    try {
      if (!this.TOKEN_KEY) {
        throw new Error("Key is missing");
      }
      return jwt.sign(data, this.TOKEN_KEY, { expiresIn });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  generateAccessToken(user_id) {
    return this.generateToken({ user_id }, this.ACCESS_TOKEN_TIMEOUT);
  }

  generateRefreshToken(user_id) {
    return this.generateToken({ user_id }, this.REFRESH_TOKEN_TIMEOUT);
  }
}

module.exports = UserAuth.getInstance();
