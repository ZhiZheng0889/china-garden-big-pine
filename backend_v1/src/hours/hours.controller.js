const service = require("./hours.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const ignoreStoreHours = process.env.IGNORE_STORE_HOURS === "true";
const dayjs = require("dayjs");

async function getOperationHours(req, res, next) {
  const hours = await service.getOperationHours();
  if (!hours) {
    return next({
      status: 504,
      message: "Error getting operation hours. Please try again",
    });
  }
  res.status(200).json(hours);
}

async function getDailyOperationHours(req, res, next) {
  try {
    const { date } = req.params;
    if (ignoreStoreHours) {
      res.status(200).json({ open: "12:00", close: "23:59" });
    }
    const foundClosedHours = await service.getClosedHours(date);
    console.log(foundClosedHours);
    if (foundClosedHours) {
      res.status(200).json({ open: "", close: "" });
    } else {
      const dayOfWeek = dayjs(date).format("dddd").toLowerCase();
      console.log(dayOfWeek);
      if (!dayOfWeek) {
        return next({
          status: 400,
          message: "Day of week not found",
        });
      }
      const operationHours = await service.getOperationHours();
      console.log("OPERATION HOURS: ", operationHours);
      if (!operationHours) {
        return next({
          status: 500,
          message: "Operation hours not found",
        });
      }
      res.status(200).json(operationHours[dayOfWeek]);
    }
  } catch (error) {
    return next({
      status: 500,
      message: "Operation hours not found.",
    });
  }
}

module.exports = {
  getHours: asyncErrorBoundary(getOperationHours),
  getDailyHours: asyncErrorBoundary(getDailyOperationHours),
};
