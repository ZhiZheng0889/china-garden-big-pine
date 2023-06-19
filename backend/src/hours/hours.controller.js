const service = require("./hours.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Get operation hours
async function getOperationHours(req, res, next) {
  const hours = await service.getOperationHours();
  if (!hours) {
    return next({
      status: 504,
      message: "Error getting operation hours. Please try again",
    });
  }
  res.status(200).json({ data: hours });
}

async function getDailyOperationHours(req, res, next) {
  try {
    const { date } = req.query;
    const foundClosedHours = await service.getClosedHours(date);
    if (foundClosedHours) {
      res.status(204).json({ data: { open: "", close: "" } });
    } else {
      const dayOfWeek = dayjs(new Date(date)).format("dddd").toLowerCase();
      if (!dayOfWeek) {
        return next({
          status: 400,
          message: "Day of week not found",
        });
      }
      const operationHours = await service.getOperationHours();
      if (!operationHours) {
        return next({
          status: 500,
          message: "Operation hours not found",
        });
      }
      res.status(200).json({ data: operationHours[dayOfWeek] });
    }
  } catch (error) {
    next({
      status: 500,
      message: error.message,
    });
  }
}

// Update operation hours
// async function updateOperationHours(req, res) {
//     const newData = req.body;

//     fs.writeFile(path.resolve(__dirname, './src/db/data/hours.json'), JSON.stringify(newData, null, 2), 'utf-8', err => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.json(newData);
//         }
//     });
// };

module.exports = {
  getHours: asyncErrorBoundary(getOperationHours),
  getDailyHours: asyncErrorBoundary(getDailyOperationHours),
};
