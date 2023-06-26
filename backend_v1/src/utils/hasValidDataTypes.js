const hasValidDataTypes = (validDataTypes, data) => {
  return function (req, res, next) {
    const invalidTypes = Object.keys(data).filter(
      (key) => typeof data[key] !== validDataTypes[key]
    );
    if (invalidTypes.length) {
      return next({
        status: 400,
        message: `Invalid data types for: ${invalidTypes.join(", ")}`,
      });
    }
    return next();
  };
};

module.exports = hasValidDataTypes;
