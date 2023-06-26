function hasRequiredProperties(PROPERTIES) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    try {
      PROPERTIES.forEach((property) => {
        if (!data[property]) {
          return next({
            status: 400,
            message: `A '${property}' property is required`,
          });
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = hasRequiredProperties;
