class DatabaseErrorHandler {
  static handleError(error) {
    if (error?.code === 11000) {
      return this.handleDuplicateKey(error);
    } else {
      return { status: error.status, message: error.message };
    }
  }

  static handleDuplicateKey(error) {
    return {
      status: 409,
      message: `${Object.keys(error.keyPattern).join(", ")} already exist.`,
    };
  }
}

module.exports = DatabaseErrorHandler;
